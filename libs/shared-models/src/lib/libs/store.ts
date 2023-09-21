export interface Store {
  _id?: string;
  storeId: string;
  name: string;
  openHour: number;
  closeHour: number;
  reservedHours: number;
}
