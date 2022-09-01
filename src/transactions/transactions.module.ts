import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './scheme/transaction.schema';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { DefaultUtilityService } from '../utility/default.utility.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  providers: [
    TransactionsService,
    TransactionsRepository,
    DefaultUtilityService,
  ],
  exports: [TransactionsModule],
})
export class TransactionsModule {}
