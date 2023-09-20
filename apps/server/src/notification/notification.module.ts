import { Module } from '@nestjs/common';
import { IkeaConnectorService } from './ikea-connector.service';
import { PushNotificationService } from './push-notification/push-notification.service';
import { MailNotificationService } from './mail-notification/mail-notification.service';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  providers: [
    IkeaConnectorService,
    PushNotificationService,
    MailNotificationService,
    ScheduleService,
  ],
})
export class NotificationModule {}
