import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ItemService } from '../../item/item.service';
import { IkeaConnectorService } from '../ikea-connector.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private readonly ikeaService: IkeaConnectorService,
    private readonly itemService: ItemService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM, { name: 'updateIkeaProducts_8AM' })
  async handleCronAt8AM() {
    await this.updateIkeaProducts();
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM, { name: 'updateIkeaProducts_5PM' })
  async handleCronAt5PM() {
    await this.updateIkeaProducts();
  }

  private async updateIkeaProducts(): Promise<void> {
    try {
      // Fetch all products from IKEA
      const products = await this.ikeaService.fetchAllProducts();

      // Remove the outdated discounted items in database

      await this.itemService.removeOutdatedDiscountedItems(products);

      // Add the new fetched products to database
      await this.itemService.addNewDiscountedItemsFromProducts(products);

      this.logger.log('Discounted items updated successfully.');
    } catch (error) {
      this.logger.error(
        'An error occurred while updating items.',
        error,
        'ScheduleService'
      );
    }
  }
}

// TODO:
// 2. Wykorzystać serwis MailNotification do wysyłania powiadomień email do użytkowników raz na dobę o 18 każdego dnia na podstawie danych z bazy item oraz user.trackedItems
