import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  name: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
