import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserBankSettingInput } from './dto/create-user-bank-setting.dto';
import { UserBankSetting } from './schema/user-bank-setting.schema';
import { UserBankSettingsService } from './user-bank-settings.service';

@Resolver(() => UserBankSetting)
export class UserBankSettingsResolver {
  constructor(
    private readonly userBankSettingsService: UserBankSettingsService,
  ) {}

  @Mutation(() => UserBankSetting)
  createUserBankSettings(
    @Args('createUserBankSettingDto')
    createUserBankSettingDto: CreateUserBankSettingInput,
  ) {
    return this.userBankSettingsService.create(createUserBankSettingDto);
  }

  //@ResolveField()

  // @Get()
  // findAll() {
  //   return this.userBankSettingsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userBankSettingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserBankSettingDto: UpdateUserBankSettingDto,
  // ) {
  //   return this.userBankSettingsService.update(+id, updateUserBankSettingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userBankSettingsService.remove(+id);
  // }
}
