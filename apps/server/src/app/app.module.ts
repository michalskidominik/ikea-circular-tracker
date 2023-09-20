import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { PriceHistoryModule } from '../price-history/price-history.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    UserModule,
    ItemModule,
    PriceHistoryModule,
    StoreModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ikea-circular-tracker'),
  ], // TODO: move to env
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
