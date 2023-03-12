import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBankSettingsService } from './user-bank-settings.service';
import { CreateUserBankSettingDto } from './dto/create-user-bank-setting.dto';
import { UpdateUserBankSettingDto } from './dto/update-user-bank-setting.dto';

@Controller('user-bank-settings')
export class UserBankSettingsController {
  constructor(private readonly userBankSettingsService: UserBankSettingsService) {}

  @Post()
  create(@Body() createUserBankSettingDto: CreateUserBankSettingDto) {
    return this.userBankSettingsService.create(createUserBankSettingDto);
  }

  @Get()
  findAll() {
    return this.userBankSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBankSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBankSettingDto: UpdateUserBankSettingDto) {
    return this.userBankSettingsService.update(+id, updateUserBankSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBankSettingsService.remove(+id);
  }
}
