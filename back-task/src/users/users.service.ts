import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { User, UserDocument } from '../schemas/user.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async sendOtp(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;

    await user.save();

    console.log('USER_MAILER:', process.env.USER_MAILER);
    console.log('USER_MAILER_PASSWORD:', process.env.USER_MAILER_PASSWORD);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['USER_MAILER'],
        pass: process.env['USER_MAILER_PASSWORD'],
      },
    });

    const mailOptions = {
      from: process.env['USER_MAILER'],
      to: email,
      subject: 'Your OTP Code to Task Manger',
      text: `Ваш OTP код ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return { message: `OTP отправлен на ${email}` };
  }

  async compareOtp(email: string, otp: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || user.otp !== otp) {
      throw new UnprocessableEntityException('Неверный OTP');
    }

    return { message: 'Success' };
  }

  async changePassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    user.password = password; // Предполагается, что пароль хешируется через middleware Mongoose
    user.generateToken();

    await user.save();

    return { message: 'Пароль изменен' };
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new UnprocessableEntityException(
        'This user is already registered!',
      );
    }

    const user = new this.userModel({
      email: createUserDto.email,
      password: createUserDto.password,
      username: createUserDto.username,
    });

    user.generateToken();

    await user.save();
    return {
      message: 'Ok',
      user,
    };
  }

  async logout(req: Request) {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!!' };

    if (!headerValue) {
      return successMessage;
    }

    const [_, token] = headerValue.split(' ');

    if (!token) {
      return successMessage;
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      return successMessage;
    }

    user.generateToken();
    await user.save();

    return successMessage;
  }
}
