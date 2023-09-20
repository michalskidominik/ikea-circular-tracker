import { Module } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { PriceHistoryController } from './price-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceHistory, PriceHistorySchema } from './price-history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PriceHistory.name, schema: PriceHistorySchema }])],
  providers: [PriceHistoryService],
  controllers: [PriceHistoryController],
})
export class PriceHistoryModule {}
