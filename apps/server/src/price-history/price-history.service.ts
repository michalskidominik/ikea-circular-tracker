import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PriceHistory } from './price-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class PriceHistoryService {
  constructor(@InjectModel(PriceHistory.name) private priceHistoryModel: Model<PriceHistory>) {}
}
