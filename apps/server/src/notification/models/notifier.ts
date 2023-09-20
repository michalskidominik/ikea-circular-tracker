export interface NotificationPayload {
  title: string;
  message: string;
}

export interface Notifier {
  sendNotification(userId: string, payload: NotificationPayload): Promise<void>;
}
