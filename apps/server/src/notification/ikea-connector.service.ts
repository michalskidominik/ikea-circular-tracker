import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SearchResponse } from '@shared-models'

@Injectable()
export class IkeaConnectorService {
  constructor(private readonly httpService: HttpService) {}

  // example GET https://web-api.ikea.com/circular/circular-asis/api/public/store/pl/pl/204?page=0&size=16&search=40430588
  async getProductsByArticleNumber(articleNumber: string) {
    const url = `https://web-api.ikea.com/circular/circular-asis/api/public/store/pl/pl/204?page=0&size=16&search=${articleNumber}`;

    return this.httpService.get<SearchResponse>(url).pipe(map((response) => response.data));
  }
}

// TODO
// 1. Zaimplementować metodę, która komunikuje się z API Ikea w celu pobrania obecnych promocji
// 2. Zaimplementować metodę - crawler, która pobiera dostępne sklepy z IKEA
// 3. Zaimplementować metodę, która zwraca dopasowania dostępnych produktów z Ikea po search query
