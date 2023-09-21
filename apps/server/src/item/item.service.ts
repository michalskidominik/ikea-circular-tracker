import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@shared-models';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Item } from './item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
    private readonly userService: UserService
  ) {}

  async truncateDiscountedItems(): Promise<void> {
    await this.itemModel.deleteMany({}).exec();
  }

  async addDiscountedItemsFromProducts(products: Product[]): Promise<void> {
    const items = products.map((product) => ({
      name: product.title,
      itemId: product.id.toString(),
      storeId: product.storeId.toString(),
      originalPrice: product.articlesPrice,
      discountPrice: product.price,
      imageUrl: product.heroImage,
      ikeaUrl: `https://www.ikea.com/pl/pl/p/${product.id}`, // This is a guess. Actual URL format may be different.
      reasonDiscount: product.reasonDiscount,
      lastChecked: new Date(),
      nextCheckTime: null, // If you have a specific time in mind, set it here.
    }));

    await this.itemModel.insertMany(items);
  }

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
    const regexQuery = new RegExp(query, 'i');

    const filter = {
      $or: [{ name: regexQuery }, { itemId: regexQuery }],
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

  async getHottestDeals(
    storeId: string,
    page = 1,
    limit = 12
  ): Promise<{ items: Item[]; totalPages: number; currentPage: number }> {

    const items = await this.itemModel.aggregate([
      {
        $match: { storeId }
      },
      {
        $addFields: {
          discountDifference: { $subtract: ["$originalPrice", "$discountPrice"] }
        }
      },
      {
        $sort: { discountDifference: -1 }  // -1 for descending order
      },
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      }
    ]).exec();

    const count = await this.itemModel.countDocuments({ storeId });
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
