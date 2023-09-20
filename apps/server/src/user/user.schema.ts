import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: [String], default: [] })
  trackedItems: string[];

  @Prop({ type: [String], default: [] })
  notifiedItems: string[];

  @Prop()
  lastNotificationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
