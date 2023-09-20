import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
