import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BankSettingsService } from './bank-settings.service';
import { CreateBankSettingInput } from './dto/create-bank-setting.input';
import { UpdateBankSettingInput } from './dto/update-bank-setting.input';
import { BankSetting } from './schema/bank-setting.schema';

@Resolver(() => BankSetting)
export class BankSettingsResolver {
  constructor(private readonly bankSettingsService: BankSettingsService) {}

  @Mutation(() => BankSetting)
  createBankSetting(
    @Args('createBankSettingInput')
    createBankSettingInput: CreateBankSettingInput,
  ) {
    return this.bankSettingsService.create(createBankSettingInput);
  }

  @Query(() => [BankSetting], { name: 'bankSettings' })
  findAll() {
    return this.bankSettingsService.findAll();
  }

  @Query(() => BankSetting, { name: 'bankSetting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bankSettingsService.findOne(id);
  }

  @Mutation(() => BankSetting)
  updateBankSetting(
    @Args('updateBankSettingInput')
    updateBankSettingInput: UpdateBankSettingInput,
  ) {
    return this.bankSettingsService.update(
      updateBankSettingInput.id,
      updateBankSettingInput,
    );
  }

  @Mutation(() => BankSetting)
  removeBankSetting(@Args('id', { type: () => Int }) id: number) {
    return this.bankSettingsService.remove(id);
  }
}
