import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
