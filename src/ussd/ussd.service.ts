import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UssdDto } from './dto/ussd.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as https from 'https';
import { NALO_USSD_SERVICE } from '../config';
import { UssdRepository } from './ussd.repository';

@Injectable()
export class UssdService {
  private logger = new Logger(UssdService.name);

  constructor(
    private readonly httpService: HttpService,
    private ussdRepository: UssdRepository,
  ) {}

  public sendRequestUserService(
    uData: UssdDto,
  ): Observable<AxiosResponse<UssdDto>> {
    const {
      userId,
      msisdn,
      userData,
      msgType,
      network,
      sessionId,
      transId,
      msg,
    } = uData;

    const uParam: any = {
      USERID: userId,
      MSISDN: msisdn,
      USERDATA: userData,
      MSGTYPE: msgType,
      NETWORK: network,
      SESSIONID: sessionId,
      MSG: msg,
    };

    const configs = {
      url: NALO_USSD_SERVICE + '/api/ussd/purl',
      body: uParam,
      // agent: new https.Agent({
      //   rejectUnauthorized: false,
      // })
    };

    this.logger.log(`SEND USER REQUEST payload == ${JSON.stringify(configs)}`);
    return this.httpService.post(configs.url, configs.body).pipe(
      map((srusRes) => {
        this.logger.log(
          `NALO USSD SERVICE response ==  ${JSON.stringify(srusRes.data)}`,
        );
        // if (srusRes) {
        //   this.ussdRepository.saveUSSDSessions(srusRes.data);
        // }
        return srusRes.data;
      }),
    );
  }

  // public saveUserInput(
  //
  // ) {
  //
  // }
}
