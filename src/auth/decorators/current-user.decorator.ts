import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserBankSetting } from '../../user-bank-settings/schema/user-bank-setting.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserBankSetting => {
    const ctx = GqlExecutionContext.create(context);
    const user: UserBankSetting = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(`No user inside the request`);
    }
    return user;
  },
);
