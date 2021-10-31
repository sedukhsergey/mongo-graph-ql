import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
