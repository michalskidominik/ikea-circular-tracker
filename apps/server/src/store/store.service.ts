import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './store.schema';
import { Model } from 'mongoose';

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}
}
