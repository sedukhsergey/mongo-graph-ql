import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from "mongoose";

export class UpdatePostPatchBodyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  categories: ObjectId[];
}
