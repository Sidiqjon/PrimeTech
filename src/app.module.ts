import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { OrderModule } from './order/order.module';
import { ColorModule } from './color/color.module';
import { ChatModule } from './chat/chat.module';
import { SiteMetadataModule } from './sitemetadata/sitemetadata.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [UploadModule, PrismaModule, AuthModule, MailModule, UserModule, CategoryModule, ProductModule, RegionModule, OrderModule, ColorModule, ChatModule, SiteMetadataModule, CommentModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
