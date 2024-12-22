import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema'; // Путь может отличаться
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, validate } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userData: any): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
      isEmailConfirmed: false,
      verificationToken: uuidv4(),
    });
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    //Check if password is being updated and hash it
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    Object.assign(user, updateUserDto); // Update user properties

    // Validate before saving. You might want to use class-validator here for more robust validation.
    const validationErrors = await validate(user); //This requires you to import {validate} from 'class-validator'
    if (validationErrors) {
      throw new BadRequestException(validationErrors);
    }

    return user.save();
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findUserById(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  // ... другие методы (обновление профиля, подтверждение почты, сброс пароля и т.д.)  - будут добавлены позже
}
