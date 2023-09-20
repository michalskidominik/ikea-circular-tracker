import { Controller, Get, Param } from '@nestjs/common';

import { IkeaConnectorService } from '../ikea-connector/ikea-connector.service';

@Controller()
export class AppController {
  constructor(private readonly ikeaConnector: IkeaConnectorService) {}

  // write a GET NestJS endpoint using the IkeaConnectorService method getProductsByArticleNumber to fetch data from Ikea API
  @Get('search-by-article-number/:articleNumber')
  async getProductsByArticleNumber(
    @Param('articleNumber') articleNumber: string
  ) {
    return this.ikeaConnector.getProductsByArticleNumber(articleNumber);
  }
}
