import { Controller, Get } from '@nestjs/common';
import { Store } from '@shared-models';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('stores')
  async getStores(): Promise<Store[]> {
    return this.storeService.getAllStores();
  }
}
