import mongoose from 'mongoose';

export interface UssdInterface extends mongoose.Document {
  userId?: string;
  msisdn?: string;
  phoneNumber?: string;
  userData: string;
  msgType: any;
  network?: string;
  sessionId?: any;
  transId?: any;
  msg?: string;
  USERID?: string;
  MSISDN: string;
  USERDATA?: string;
  MSGTYPE?: any;
  NETWORK?: string;
  MSG: string;
  SESSIONID: string;
}
