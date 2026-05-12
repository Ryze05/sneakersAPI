import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from './entities/brand.entity';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: brandSchema
      }
    ])
  ]
})
export class BrandModule {}
