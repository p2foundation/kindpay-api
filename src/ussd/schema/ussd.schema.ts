import * as mongoose from 'mongoose';

export const UssdSchema = new mongoose.Schema({
  userId: String,
  msisdn: String,
  userData: String, //"*920*200",
  msgType: Boolean, //false
  msg: String,
  network: String,
  sessionId: String, //"16575041991773372"
  transId: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
