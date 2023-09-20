import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {}

// TODO:
// 1. Wykorzystać serwis IkeaConnector do regularnego pobierania danych o promocjach z Ikea raz na 6 godzin, pobrane dane zapisywa do bazy item oraz item-history
// 2. Wykorzystać serwis MailNotification do wysyłania powiadomień email do użytkowników raz na dobę o 18 każdego dnia na podstawie danych z bazy item oraz user.trackedItems
