import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UssdInterface } from './interface/ussd.interface';
import { Model } from 'mongoose';
import { UssdDto } from './dto/ussd.dto';
import { DefaultUtilityService } from '../utility/default.utility.service';

@Injectable()
export class UssdRepository {
  private logger = new Logger('UssdRepository');

  constructor(
    @InjectModel('Ussd')
    private readonly ussdModel: Model<UssdInterface>,
    private utilityService: DefaultUtilityService,
  ) {}

  public async findAllUssdSessions(): Promise<UssdInterface[]> {
    const allUssdSess = await this.ussdModel.find().exec();
    return allUssdSess;
  }

  public async findUssdSessionById(sessionId: string): Promise<UssdInterface> {
    return await this.ussdModel.findById({ _id: sessionId }).exec();
  }

  public async saveUSSDSessions(uData: UssdDto): Promise<UssdInterface> {
    const uParams: any = {
      userId: uData.USERID || uData.userId,
      msisdn: uData.MSISDN || uData.msisdn,
      userData: uData.USERDATA || uData.userData,
      msgType: uData.MSGTYPE || uData.msgType,
      network: uData.NETWORK || uData.network,
      sessionId: uData.SESSIONID || uData.sessionId,
      transId: this.utilityService.generateReferenceNumber() || uData.transId,
      msg: uData.MSG || uData.msg,
    };

    const newUssdData = new this.ussdModel(uParams);
    try {
      await newUssdData.save();
    } catch (e) {
      this.logger.error(`Ussd error saving: ${JSON.stringify(e)}`);
    }
    return newUssdData;
  }

  public async updateUssdRecord(
    sessionId: string,
    changes: UssdDto,
  ): Promise<UssdInterface> {
    const utr = await this.ussdModel.findByIdAndUpdate(sessionId, changes, {
      new: true,
    });
    return utr;
  }

  public async removeUssdRecord(sessionId: string): Promise<any> {
    const rtr = await this.ussdModel.findByIdAndRemove(sessionId);
    return rtr;
  }
}
