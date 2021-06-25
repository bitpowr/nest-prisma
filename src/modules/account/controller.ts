import { Controller, Get, Param, Query } from '@nestjs/common';
import AccountService from '@account/service';
import Compound from "@compoundjs/index"

const network = process.env.NETWORK;
const provider = process.env.PROVIDER;

@Controller('/accounts')
class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get('/')
  async getAccount(@Query('addresses') addresses: string | string[]) {
    const account: any = await Compound.api.account({
      addresses,
      network
    });

    if (account.error) throw new Error(account.error)

    return account.accounts;
  }

  @Get('/:address/balance')
  async getBalance(@Param('address') address: string) {
    const balance = await Compound.eth.getBalance(address, provider)

    return balance;
  }

  @Get("/:borrow")
  async borrow(@Param('')) => {
  const daiScaledUp = '32000000000000000000';
  const trxOptions = { mantissa: true };
  const trx = 
}
}

export default AccountController;
