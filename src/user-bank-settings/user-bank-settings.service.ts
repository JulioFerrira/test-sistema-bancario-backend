import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { BankAccountsFactoryService } from '../bank-accounts-factory/bank-accounts-factory.service';
import { BankSettingsService } from '../bank-settings/bank-settings.service';
import { UserService } from '../user/user.service';
import { CreateUserBankSettingInput } from './dto/create-user-bank-setting.dto';
import { UserBankSetting } from './schema/user-bank-setting.schema';

@Injectable()
export class UserBankSettingsService {
  constructor(
    private readonly bankAccountsFactoryService: BankAccountsFactoryService,
    private readonly bankSettingsService: BankSettingsService,
    private readonly userService: UserService,
    @InjectModel(UserBankSetting.name)
    private readonly userBankSettingsModel: Model<UserBankSetting>,
  ) {}

  async create(
    createUserBankSettingInput: CreateUserBankSettingInput,
  ): Promise<UserBankSetting> {
    const { bankSettingInput, createBankAccountsFactoryInput, userInput } =
      createUserBankSettingInput;

    const user = await this.userService.create(userInput);

    const bankSettings = await this.bankSettingsService.create(
      bankSettingInput,
    );
    const bankAccount = await this.bankAccountsFactoryService.create(
      createBankAccountsFactoryInput,
    );

    const userBankSetting = await this.userBankSettingsModel.create({
      user: user.id,
      bankSetting: bankSettings.id,
      bankAccount: bankAccount.id,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      bankAccountType: createBankAccountsFactoryInput.accountType,
    });
    return userBankSetting;
  }

  async findOneById(id: string): Promise<UserBankSetting> {
    const storedUserBankSettings = await this.userBankSettingsModel.findOne({
      id,
    });
    if (!storedUserBankSettings) {
      throw new Error('User bank settings not found');
    }
    return storedUserBankSettings;
  }

  //For JWT identification
  async findOneByUserId(userId: string): Promise<UserBankSetting> {
    const storedUserBankSettings = await this.userBankSettingsModel.findOne({
      user: userId,
    });
    if (!storedUserBankSettings) {
      throw new Error('User bank settings not found');
    }
    return storedUserBankSettings;
  }

  // findAll() {
  //   return `This action returns all userBankSettings`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} userBankSetting`;
  // }

  // update(id: number, updateUserBankSettingDto: UpdateUserBankSettingDto) {
  //   return `This action updates a #${id} userBankSetting`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userBankSetting`;
  // }
}
