import { Injectable } from '@nestjs/common';
import { NotificationPayload, Notifier } from '../models/notifier';

@Injectable()
export class PushNotificationService implements Notifier {
  sendNotification(userId: string, payload: NotificationPayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
