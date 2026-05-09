import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SneakerModule } from '../sneaker/sneaker.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SneakerModule]
})
export class SeedModule {}
