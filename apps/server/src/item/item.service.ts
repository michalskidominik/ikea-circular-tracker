import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    private readonly userService: UserService
  ) {}

  async getDiscountedItems(
    storeId: string,
    page = 1,
    limit = 12
  ): Promise<{ items: Item[]; totalPages: number; currentPage: number }> {
    const filter = { storeId };
    const items = await this.itemModel
      .find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.itemModel.countDocuments(filter);
    const totalPages = Math.ceil(count / limit);
    return { items, totalPages, currentPage: page };
  }

  async searchItems(
    query: string,
    storeId: string,
    page = 1,
    limit = 12
  ): Promise<{ items: Item[]; totalPages: number; currentPage: number }> {
    const filter = {
      name: new RegExp(query, 'i'),
      storeId,
    };
    const items = await this.itemModel
      .find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.itemModel.countDocuments(filter);
    const totalPages = Math.ceil(count / limit);
    return { items, totalPages, currentPage: page };
  }

  async getTrackedItems(
    userId: string,
    page = 1,
    limit = 12
  ): Promise<{ items: Item[]; totalPages: number; currentPage: number }> {
    // Pobierz użytkownika i listę śledzonych przedmiotów
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const trackedItemIds = user.trackedItems;
    if (!trackedItemIds || trackedItemIds.length === 0) {
      return { items: [], totalPages: 0, currentPage: page };
    }

    // Oblicz paginację
    const skip = (page - 1) * limit;

    // Pobierz przedmioty na podstawie identyfikatorów
    const items = await this.itemModel
      .find({ _id: { $in: trackedItemIds } })
      .limit(limit)
      .skip(skip)
      .exec();

    // Oblicz całkowitą liczbę stron
    const totalCount = await this.itemModel.countDocuments({
      _id: { $in: trackedItemIds },
    });
    const totalPages = Math.ceil(totalCount / limit);

    return {
      items,
      totalPages,
      currentPage: page,
    };
  }
}
