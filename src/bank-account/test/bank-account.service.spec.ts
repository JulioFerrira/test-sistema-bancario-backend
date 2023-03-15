import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BankSettingsService } from '../../bank-settings/bank-settings.service';
import { BankSettingSchema } from '../../bank-settings/schema/bank-setting.schema';
import { CheckingAccountService } from '../../checking-account/checking-account.service';
import { CheckingAccountSchema } from '../../checking-account/schema/checking-account.schema';
import { SavingsAccountService } from '../../savings-account/savings-account.service';
import { SavingsAccountSchema } from '../../savings-account/schema/savings-account.schema';
import { UserBankSetting } from '../../user-bank-settings/schema/user-bank-setting.schema';
import { BankAccountService } from '../bank-account.service';
import { DepositBalanceInput } from '../dto/deposit-balance.input';
import { TransferBalanceInput } from '../dto/transfer-balance-input';

describe('Test BankAccountService', () => {
  let bankAccountService: BankAccountService;
  let checkingAccountService: CheckingAccountService;
  let savingsAccountService: SavingsAccountService;
  let bankSettingsService: BankSettingsService;
  const userBankMock: UserBankSetting = {
    bankAccount: '123',
    bankAccountType: 'CHECKING' as any,
    bankSetting: '123',
    id: '123',
    user: '123',
  };
  const bankAccount = {
    accountNumber: '123',
    bankName: 'BANCO DE CHILE',
    id: '123',
    typeAccount: 'CHECKING' as any,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountService,
        CheckingAccountService,
        SavingsAccountService,
        BankSettingsService,
      ],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/sistema-bancario'),
        MongooseModule.forFeature([
          { name: 'CheckingAccount', schema: CheckingAccountSchema },
          { name: 'SavingsAccount', schema: SavingsAccountSchema },
          { name: 'BankSetting', schema: BankSettingSchema },
        ]),
      ],
    }).compile();

    bankAccountService = module.get<BankAccountService>(BankAccountService);
    checkingAccountService = module.get<CheckingAccountService>(
      CheckingAccountService,
    );
    savingsAccountService = module.get<SavingsAccountService>(
      SavingsAccountService,
    );
  });
  describe('depositBalance', () => {
    it('should deposit balance into account successfully', async () => {
      const depositMock: DepositBalanceInput = {
        accountIdTo: '123',
        amount: 100,
        accountTypeTo: 'CHECKING' as any,
        transferencePassword: '123',
      };
      const account = { ...bankAccount, balance: 0 }; // Create a fresh account with balance = 0
      jest
        .spyOn(bankAccountService, 'findOneBankAccount')
        .mockResolvedValueOnce(account); // Mock the findOneBankAccount method to return the fresh account
      const spy = jest.spyOn(bankAccountService, 'updateBankAccount'); // Spy on the updateBankAccount method
      const result = await bankAccountService.depositBalance(
        depositMock,
        userBankMock,
      );

      expect(spy).toHaveBeenCalledWith({
        accountType: depositMock.accountTypeTo,
        id: depositMock.accountIdTo,
        balance: depositMock.amount,
      }); // Check that the updateBankAccount method was called with the correct arguments
      expect(result).toBe(true);

      // Verify that the balance was updated correctly
      const updatedAccount = await bankAccountService.findOneBankAccount({
        accountType: depositMock.accountTypeTo,
        id: depositMock.accountIdTo,
      });
      expect(updatedAccount.balance).toBe(depositMock.amount);
    });
  });
  describe('transferBalance', () => {
    it('should transfer balance successfully', async () => {
      const transferMock: TransferBalanceInput = {
        accountNumberTo: '123',
        amount: 100,
        accountTypeTo: 'CHECKING' as any,
        bankNameTo: 'BANCO DE CHILE',
        emailTo: 'test@gmail.com',
        transferencePassword: 'TRANSFERENCIA',
      };
      const spy = jest.spyOn(bankAccountService, 'transferBalance');
      spy.mockResolvedValueOnce(true);
      let result = await bankAccountService.transferBalance(
        transferMock,
        userBankMock,
      );
      expect(result).toBe(true);
      expect(spy).toHaveBeenCalled();
    });
  });
});
