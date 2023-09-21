import { Injectable, OnModuleInit } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { STORES } from './stores';

@Injectable()
export class DatebaseInitializerService implements OnModuleInit {
  constructor(private readonly storeService: StoreService) {}

  async onModuleInit() {
    await this.storeService.truncateStores();

    for (const store of STORES) {
      const existingStore = await this.storeService.findByName(store.name);
      if (!existingStore) {
        await this.storeService.createStore({
          storeId: store.store_id,
          name: store.name,
          openHour: store.open_hour,
          closeHour: store.close_hour,
          reservedHours: store.reserved_hours,
        });
      }
    }
  }
}
