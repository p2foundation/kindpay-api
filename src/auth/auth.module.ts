import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { PasswordHasherService } from './password.hasher.service';
import { JwtStrategy } from './jwt.strategy';
import { AppService } from '../app.service';
import { JWT_SECRET } from '../config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: JWT_SECRET || process.env.JWT_SECRET }),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  providers: [AuthService, AppService, PasswordHasherService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
