import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as https from 'https';

@Injectable()
export class PaystackService {
  private logger = new Logger(PaystackService.name);

  // constructor(private httpService: HttpService) {}
  //
  // public psCallback(transDto): Observable<AxiosResponse> {
  //   const { status, transactionId, description, amount } = transDto;
  //
  //   const psParam: any = {
  //     status,
  //     transaction_id: transactionId || '',
  //     reason: description || '',
  //     amount,
  //   };
  //
  //   const configs = {
  //     url: '',
  //     body: psParam,
  //   };
  //   this.logger.log(`test post payload == ${JSON.stringify(configs)}`);
  //   return this.httpService.post(configs.url, configs.body).pipe(
  //     map((wcRes) => {
  //       this.logger.log(
  //         `service response STATUS ==  ${JSON.stringify(wcRes.data)}`,
  //       );
  //       return wcRes.data;
  //     }),
  //   );
  // }
  //
  // public inlinePayments(
  //   transDto,
  // ): Observable<AxiosResponse> {
  //   const { description, amount, redirectURL, customerEmail, transId } =
  //     transDto;
  //
  //   const ipParams: any = {
  //     merchant_id: PAYSWITCH_MERCHANTID,
  //     transaction_id: psRandomGeneratedNumber() || transId,
  //     desc: description,
  //     amount,
  //     redirect_url: redirectURL || RESPONSE_URL,
  //     email: customerEmail || '',
  //   };
  //
  //   const configs = {
  //     url: PAYSWITCH_CHECKOUT_URL + '/initiate',
  //     body: ipParams,
  //     auth: {
  //       username: `${PAYSWITCH_USERNAME_PROD}`,
  //       password: `${PAYSWITCH_APIKEY_PROD}`,
  //     },
  //     agent: new https.Agent({
  //       rejectUnauthorized: false,
  //     }),
  //   };
  //
  //   this.logger.log(
  //     `INLINE PAYMENT payload config == ${JSON.stringify(configs)}`,
  //   );
  //   return this.httpService
  //     .post(configs.url, configs.body, {
  //       httpsAgent: configs.agent,
  //       auth: configs.auth,
  //     })
  //     .pipe(
  //       map((ipRes) => {
  //         this.logger.verbose(
  //           `INLINE PAYMENT server response => ${JSON.stringify(ipRes.data)}`,
  //         );
  //         return ipRes.data;
  //       }),
  //       catchError((ipError) => {
  //         this.logger.error(`ERROR INLINE PAYMENT => ${ipError.data}`);
  //         return ipError.data;
  //       }),
  //     );
  // }
}
