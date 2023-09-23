import {
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  // TODO: przenieść do serwisu notification
  // dev-only
  @Get('find-updates-for-tracked-items')
  async findUpdatesForTrackedItems(@Res() res: Response): Promise<Response> {
    const items = await this.itemService.findUpdatesForTrackedItems();

    return res.json(items);
  }

  @Get('discounts')
  async getDiscountedItems(
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.getDiscountedItems(
      storeId,
      Number(page),
      Number(limit)
    );
  }

  @Get('hottest-deals')
  async getHottestDeals(
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.getHottestDeals(
      storeId,
      Number(page),
      Number(limit)
    );
  }

  @Get('search')
  async searchItems(
    @Query('query') query: string,
    @Query('storeId') storeId: string,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    return this.itemService.searchItems(
      query,
      storeId,
      Number(page),
      Number(limit)
    );
  }

  @UseGuards(AuthGuard)
  @Get('tracked-items')
  async getTrackedItems(
    @Request() req,
    @Query('page') page: number | undefined,
    @Query('limit') limit: number | undefined
  ) {
    const userId = req.user.sub;
    return this.itemService.getTrackedItems(
      userId,
      Number(page),
      Number(limit)
    );
  }
}
