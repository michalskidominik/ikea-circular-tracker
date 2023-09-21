import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product, SearchResponse } from '@shared-models';
import { StoreService } from '../store/store.service';

@Injectable()
export class IkeaConnectorService {
  private readonly BASE_URL =
    'https://web-api.ikea.com/circular/circular-asis/api/public/store/pl/pl/';
  private readonly MAX_PAGE_SIZE = 64;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 2000; // 2 seconds

  constructor(
    private readonly httpService: HttpService,
    private readonly storeService: StoreService
  ) {}

  async fetchAllProducts(): Promise<Product[]> {
    const stores = await this.storeService.getAllStores(); // Pobranie wszystkich sklepów
    const allProducts: Product[] = [];

    if (stores.length === 0) {
      throw new InternalServerErrorException('No stores found in database');
    }

    for (const store of stores) {
      let page = 0;
      let hasNextPage = true;
      const baseUrlForStore = `${this.BASE_URL}${store.storeId}`;

      while (hasNextPage) {
        const url = `${baseUrlForStore}?page=${page}&size=${this.MAX_PAGE_SIZE}`;

        let retries = 0;
        let success = false;

        while (retries < this.MAX_RETRIES && !success) {
          try {
            const response = await this.httpService
              .get<SearchResponse>(url)
              .toPromise();

            if (response.data.empty) {
              hasNextPage = false;
              break;
            }

            if (response.data.content && response.data.content.length > 0) {
              allProducts.push(
                ...response.data.content.map((product) => ({
                  ...product,
                  storeId: store.storeId,
                }))
              );
            }

            if (response.data.last) {
              hasNextPage = false;
            } else {
              page += 1;
            }
            success = true;
          } catch (error) {
            retries += 1;
            if (retries < this.MAX_RETRIES) {
              await new Promise((resolve) =>
                setTimeout(resolve, this.RETRY_DELAY)
              );
            }
          }
        }

        if (!success) {
          throw new InternalServerErrorException(
            `Failed to fetch data for store ${store.name} from IKEA after ${this.MAX_RETRIES} attempts`
          );
        }
      }
    }

    return allProducts;
  }
}
