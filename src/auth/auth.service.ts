import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MailService } from '../mail/mail.service';
import { Role, Status } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (userExists) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        regionId: dto.regionId,
        year: dto.year,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        password: hashedPassword,
        role: dto.role ?? Role.USER,
        img: dto.img ?? [],
        status: Status.INACTIVE,
        onlineAt: null,
      },
    });

    await this.mailService.sendOtp(dto.email, otp);

    return { message: 'User registered successfully. OTP sent to email.', otp };
  }

  async login(email: string, password: string, ip: string, deviceInfo?: string, location: string = '') {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const existingSession = await this.prisma.session.findFirst({
      where: { userId: user.id, ipAddress: ip },
    });

    if (!existingSession) {
      await this.prisma.session.create({
        data: {
          userId: user.id,
          ipAddress: ip,
          deviceInfo,
          location,
        },
      });
      await this.mailService.sendNewLoginNotification(email, ip);
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    const refreshToken = this.jwtService.sign({ id: user.id, role: user.role }, { expiresIn: '7d' });
    
    return { accessToken: token, refreshToken };
  }
}
