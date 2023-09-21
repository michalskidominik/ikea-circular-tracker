import { Module } from '@nestjs/common';
import { IkeaConnectorService } from './ikea-connector.service';
import { PushNotificationService } from './push-notification/push-notification.service';
import { MailNotificationService } from './mail-notification/mail-notification.service';
import { ScheduleService } from './schedule/schedule.service';
import { NotificationController } from './notification.controller';
import { HttpModule } from '@nestjs/axios';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [HttpModule, StoreModule],
  providers: [
    IkeaConnectorService,
    PushNotificationService,
    MailNotificationService,
    ScheduleService,
  ],
  controllers: [NotificationController],
  exports: [IkeaConnectorService]
})
export class NotificationModule {}
