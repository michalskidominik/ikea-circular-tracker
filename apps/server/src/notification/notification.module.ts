import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { ItemModule } from '../item/item.module';
import { StoreModule } from '../store/store.module';
import { IkeaConnectorService } from './ikea-connector.service';
import { MailNotificationService } from './mail-notification/mail-notification.service';
import { NotificationController } from './notification.controller';
import { PushNotificationService } from './push-notification/push-notification.service';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => StoreModule),
    forwardRef(() => ItemModule),
  ],
  providers: [
    IkeaConnectorService,
    PushNotificationService,
    MailNotificationService,
    ScheduleService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
