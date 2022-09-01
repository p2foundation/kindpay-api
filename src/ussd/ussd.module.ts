import { Module } from '@nestjs/common';
import { UssdController } from './ussd.controller';
import { UssdService } from './ussd.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UssdSchema } from './schema/ussd.schema';
import { UssdRepository } from './ussd.repository';
import { DefaultUtilityService } from '../utility/default.utility.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Ussd', schema: UssdSchema }]),
  ],
  controllers: [UssdController],
  providers: [UssdService, UssdRepository, DefaultUtilityService],
})
export class UssdModule {}
