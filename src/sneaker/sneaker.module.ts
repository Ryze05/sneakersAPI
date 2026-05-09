import { Module } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sneaker, SneakerSchema } from './entities/sneaker.entity';

@Module({
  controllers: [SneakerController],
  providers: [SneakerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Sneaker.name,
        schema: SneakerSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class SneakerModule {}
