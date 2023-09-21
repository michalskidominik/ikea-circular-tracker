import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store as StoreSchema } from './store.schema';
import { Model } from 'mongoose';
import { Store } from '@shared-models';

@Injectable()
export class StoreService {
  constructor(@InjectModel(StoreSchema.name) private storeModel: Model<StoreSchema>) {}

  async truncateStores(): Promise<void> {
    await this.storeModel.deleteMany({}).exec();
  }

  async getAllStores(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  async createStore(storeData: Store): Promise<StoreSchema> {
    const newStore = new this.storeModel(storeData);
    return newStore.save();
  }

  async findByName(storeName: string): Promise<StoreSchema | null> {
    return this.storeModel.findOne({ name: storeName }).exec();
  }
}
