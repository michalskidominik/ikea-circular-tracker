import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  openHour: number;

  @Prop({ required: true })
  closeHour: number;

  @Prop({ required: true })
  reservedHours: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
