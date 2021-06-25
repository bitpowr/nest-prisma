import { Module } from '@nestjs/common';
import AppModule from '@modules/account/module';

@Module({
  imports: [AppModule],
})
export default class Modules {}
