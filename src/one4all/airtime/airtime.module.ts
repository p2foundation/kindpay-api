import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from 'src/transactions/scheme/transaction.schema';
import { TransactionsRepository } from 'src/transactions/transactions.repository';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { DefaultUtilityService } from '../../utility/default.utility.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [AirtimeController],
  providers: [AirtimeService, TransactionsRepository, DefaultUtilityService],
})
export class AirtimeModule {}
