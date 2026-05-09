import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SneakerModule } from './sneaker/sneaker.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/Joi.validator';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      validationSchema: JoiValidationSchema
    }),
    SneakerModule,
    MongooseModule.forRoot(process.env.MONGO_URL!),
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
