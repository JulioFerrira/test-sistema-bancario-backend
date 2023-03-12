import { Field, InterfaceType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InterfaceType()
@Schema()
export class Base {
  @Field()
  @Prop({ unique: true })
  id: string;

  @Field({ nullable: true })
  @Prop()
  updatedAt?: Date;

  @Field({ nullable: true })
  @Prop()
  createdAt?: Date;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
