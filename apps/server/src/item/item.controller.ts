import { Controller, Get, HttpStatus, Query, Res, Request, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { IkeaConnectorService } from '../notification/ikea-connector.service';
import { ItemService } from './item.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('item')
export class ItemController {
  constructor(
    private readonly ikeaService: IkeaConnectorService,
    private readonly itemService: ItemService
  ) {}

  @Get('update-discounted-items')
  async updateDiscountedItems(@Res() res: Response): Promise<Response> {
    try {
      // Fetch all products from IKEA
      const products = await this.ikeaService.fetchAllProducts();

      // Truncate the discounted items in database
      await this.itemService.truncateDiscountedItems();

      // Add the fetched products to database
      await this.itemService.addDiscountedItemsFromProducts(products);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Discounted items updated successfully.' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          'An error occurred while updating items. ' + JSON.stringify(error),
      });
    }
  }

  @Get('discounts')
  async getDiscountedItems(
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.getDiscountedItems(storeId, Number(page), Number(limit));
  }

  @Get('hottest-deals')
  async getHottestDeals(
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.getHottestDeals(storeId, Number(page), Number(limit));
  }

  @Get('search')
  async searchItems(
    @Query('query') query: string,
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.searchItems(query, storeId, Number(page), Number(limit));
  }

  @UseGuards(AuthGuard)
  @Get('tracked-items')
  async getTrackedItems(
    @Request() req,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    const userId = req.user.sub;
    return this.itemService.getTrackedItems(userId, Number(page), Number(limit));
  }
}
