import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: true })
  discountPrice: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  ikeaUrl: string;

  @Prop()
  lastChecked: Date;

  @Prop()
  nextCheckTime: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
