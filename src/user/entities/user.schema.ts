import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Album } from '../../album/entities/album.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }])
  albums: Album;
}

export const UserSchema = SchemaFactory.createForClass(User);
