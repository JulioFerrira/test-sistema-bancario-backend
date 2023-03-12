import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BankSettingsService } from './bank-settings.service';
import { UpdateBankSettingInput } from './dto/update-bank-setting.input';
import { BankSetting } from './schema/bank-setting.schema';

@Resolver(() => BankSetting)
export class BankSettingsResolver {
  constructor(private readonly bankSettingsService: BankSettingsService) {}

  @Query(() => BankSetting)
  async findOneBankSettings(@Args('id') id: string): Promise<BankSetting> {
    return this.bankSettingsService.findOneById(id);
  }

  @Mutation(() => BankSetting)
  updateBankSetting(
    @Args('updateBankSettingInput')
    updateBankSettingInput: UpdateBankSettingInput,
  ) {
    return this.bankSettingsService.updateBankSetting(updateBankSettingInput);
  }

  // @Mutation(() => BankSetting)
  // removeBankSetting(@Args('id', { type: () => Int }) id: number) {
  //   return this.bankSettingsService.remove(id);
  // }
}
