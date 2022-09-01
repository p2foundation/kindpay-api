import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import * as https from 'https';
import {
  ONE4ALL_APIKEY,
  ONE4ALL_APISECRET,
  ONE4ALL_BASEURL,
  ONE4ALL_RETAILER,
} from 'src/config';
import { TransStatusDto } from './dto/transtatus.dto';
import { TopupDto } from './dto/topup.dto';
import { TransactionsRepository } from 'src/transactions/transactions.repository';
import { TransactionDto } from 'src/transactions/dto/transaction.dto';
import { DefaultUtilityService } from '../../utility/default.utility.service';

@Injectable()
export class AirtimeService {
  private logger = new Logger('AirtimeService');
  private AirBaseUrl = ONE4ALL_BASEURL;

  constructor(
    private readonly httpService: HttpService,
    private readonly transactionRepo: TransactionsRepository,
    private defaultUtility: DefaultUtilityService,
  ) {}

  transactionStatus(
    transDto: TransStatusDto,
  ): Observable<AxiosResponse<TransStatusDto>> {
    const { transReference } = transDto;

    const payload = {
      trxn: transReference || '',
    };

    // https://tppgh.myone4all.com/api/TopUpApi/transactionStatus?trxn=1KNRUW111021

    const tsUrl =
      this.AirBaseUrl + `/TopUpApi/transactionStatus?trxn=${payload.trxn}`;

    const configs = {
      url: tsUrl,
      headers: { ApiKey: ONE4ALL_APIKEY, ApiSecret: ONE4ALL_APISECRET },
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    this.logger.log(`transaction status payload == ${JSON.stringify(configs)}`);

    return this.httpService
      .get(configs.url, { httpsAgent: configs.agent, headers: configs.headers })
      .pipe(
        map((tsRes) => {
          this.logger.log(
            `Query TRANSACTION STATUS response ++++ ${JSON.stringify(tsRes)}`,
          );
          return tsRes.data;
        }),
        catchError((tsError) => {
          this.logger.error(
            `Query TRANSACTION STATUS ERROR response ---- ${JSON.stringify(
              tsError.data,
            )}`,
          );
          return tsError.data;
        }),
      );
  }

  topupAirtime(transDto: TopupDto): Observable<AxiosResponse<TopupDto>> {
    const { retailer, recipientNumber, amount, network } = transDto;

    const clientReference = this.defaultUtility.generateTransactionId();
    const taParams = {
      retailer: ONE4ALL_RETAILER || retailer,
      network: 0 || network,
      recipient: recipientNumber || '',
      amount: amount,
      trxn: clientReference || '',
    };
    // const newTaParams = JSON.stringify(taParams);
    // https://tppgh.myone4all.com/api/TopUpApi/airtime?retailer=233241603241&recipient=233244588584&amount=1&network=0&trxn=1234567890

    const taUrl = `/TopUpApi/airtime?retailer=${taParams.retailer}&recipient=${taParams.recipient}&amount=${taParams.amount}&network=${taParams.network}&trxn=${taParams.trxn}`;

    const configs: any = {
      url: this.AirBaseUrl + taUrl,
      headers: { ApiKey: ONE4ALL_APIKEY, ApiSecret: ONE4ALL_APISECRET },
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    this.logger.log(`Airtime topup payload == ${JSON.stringify(configs)}`);

    return this.httpService
      .get(configs.url, {
        httpsAgent: configs.agent,
        headers: configs.headers,
      })
      .pipe(
        map((taRes) => {
          console.log('taResponse ====> '+taRes);
          this.logger.verbose(
            `AIRTIME TOPUP response ++++ ${JSON.stringify(taRes.data)}`,
          );
          const results: any = {body: ''}
          results.body = taRes.data;

          return results;
        }),
        catchError((taErrorRes) => {
          // console.log('topup error response ==+>', taErrorRes);
          this.logger.error(
            `AIRTIME TOPUP ERROR response ---- ${JSON.stringify(taErrorRes.response.data)}`,
          );
          const taErrorMessage = taErrorRes.response.data;
          throw new NotFoundException(taErrorMessage);
        }),
      );
  }
}
