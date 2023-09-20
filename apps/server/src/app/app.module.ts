import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IkeaConnectorService } from '../ikea-connector/ikea-connector.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, IkeaConnectorService],
})
export class AppModule {}
