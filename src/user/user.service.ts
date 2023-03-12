import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError } from 'apollo-server-core';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { email, name, password } = createUserInput;
    const storedUser = await this.userModel.findOne({ email });
    if (storedUser) {
      throw new UserInputError('User already exists');
    }
    const user = await this.userModel.create({
      email,
      name,
      password: await bcrypt.hash(password, 11),
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const storedUser = await this.userModel.findOne({ id });
    if (!storedUser) {
      throw new UserInputError('User does not exist');
    }
    return storedUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const storedUser = await this.userModel.findOne({ email });
    if (!storedUser) {
      throw new UserInputError('User does not exist');
    }
    return storedUser;
  }
}
