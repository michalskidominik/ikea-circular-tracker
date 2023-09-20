import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PriceHistoryDocument = HydratedDocument<PriceHistory>;

@Schema()
export class PriceHistory extends Document {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  discountPrice: number;

  @Prop({ required: true })
  originalPrice: number;
}

export const PriceHistorySchema = SchemaFactory.createForClass(PriceHistory);
