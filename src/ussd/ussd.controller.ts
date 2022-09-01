import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { raw, Response } from 'express';
import { UssdDto } from './dto/ussd.dto';
import { UssdService } from './ussd.service';
import { USER_ID } from '../config';
import { UserDto } from '../auth/dto/user.dto';
import { UssdInterface } from './interface/ussd.interface';
import { UssdRepository } from './ussd.repository';

@Controller('api/ussd')
export class UssdController {
  private logger = new Logger('UssdController');

  constructor(
    private ussdService: UssdService,
    private ussdRepository: UssdRepository,
  ) {}

  @Get('test')
  testUSSD(): any {
    console.log(`USSD Server up ...`);
    return `Kindpay USSD server up & running ...`;
  }

  @Post('purl')
  public async receiveUssdRequest(
    @Res() res: Response,
    @Body() udata,
  ): Promise<any> {
    let rawResponse: any = {};
    const mRequest = await udata;
    this.logger.log(`INIT USSD REQUEST=> ${JSON.stringify(mRequest)}`);
    await this.ussdRepository.saveUSSDSessions(mRequest);
    const menuPage1 = `
      Kindly Paybills to anyone
1) Top up Airtime to all Networks
2) Buy Data to all networks
3) Other Bills
4) Become a Merchant
5) Help


0257877571
    `;

    const menuPage1a: any = `
    Select an Option
    Enter recipient number
    `;
    if (udata.SESSIONID && udata.MSGTYPE == true) {
      rawResponse = {
        USERID: udata.USERID,
        MSISDN: udata.MSISDN,
        USERDATA: udata.USERDATA,
        MSG: menuPage1,
        MSGTYPE: udata.MSGTYPE,
        // network: udata.NETWORK,
        // sessionId: udata.SESSIONID,
        // cuSessionId: udata.MSISDN,
      };
      res.status(HttpStatus.CREATED).send(rawResponse);
    } else if (udata.MSGTYPE == false && udata.USERDATA == '1') {
      rawResponse = {
        USERID: udata.USERID,
        MSISDN: udata.MSISDN,
        USERDATA: udata.USERDATA,
        MSG: menuPage1a,
        MSGTYPE: udata.MSGTYPE,
        // network: udata.NETWORK,
        // sessionId: udata.SESSIONID,
        // cuSessionId: udata.MSISDN,
      };
      res.status(HttpStatus.CREATED).send(rawResponse);
    } else {
      return 'USSD request sent.';
    }
  }

  @Post('sendUser')
  public async sendUserResponse(
    @Res() res: Response,
    @Body() udata,
  ): Promise<any> {
    this.logger.verbose(`${udata}`);

    if (udata.SESSIONID && udata.MSGTYPE == true) {
      const raw: any = {
        userId: udata.USERID,
        msisdn: udata.MSISDN,
        userData: udata.USERDATA,
        msg: `WELCOME ${udata.MSISDN}, TO KINDPAY APP`,
        msgType: udata.MSGTYPE,
      };
      this.ussdService.sendRequestUserService(raw);
      // return raw;
    }

    return 'request sent to UssdService';
  }

  @Post('saveussdrecords')
  public async createUssdRecord(
    @Res() res: Response,
    @Body() uData: UssdDto,
  ): Promise<any> {
    this.logger.log(`ussd input ===> ${JSON.stringify(uData)}`);
    const cur = await this.ussdRepository.saveUSSDSessions(uData);
    res.status(HttpStatus.CREATED).json(cur);
  }

  @Get('ussdrecords')
  public async readAllUssdRecords(@Res() res: Response): Promise<any> {
    const raur = await this.ussdRepository.findAllUssdSessions();
    res.status(HttpStatus.OK).json(raur);
  }
}
