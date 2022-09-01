import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UssdModule } from './ussd/ussd.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './config';
import { AuthModule } from './auth/auth.module';
import { PaystackModule } from './paystack/paystack.module';
import { AirtimeModule } from './one4all/airtime/airtime.module';

@Module({
  imports: [
    AuthModule,
    UssdModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || MONGODB_URI),
    AirtimeModule,
    PaystackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
