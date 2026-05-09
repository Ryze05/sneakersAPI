import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sneaker } from '../sneaker/entities/sneaker.entity';
import { Model } from 'mongoose';
import { SNEAKERS_SEED_DATA } from '../sneaker/data/sneaker.data';

@Injectable()
export class SeedService {

  private readonly logger = new Logger('SneackerService');

  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel: Model<Sneaker>
  ) { }

  async runSeed(): Promise<{message: string, itemsInserted: number}> {
    try {
      await this.sneakerModel.deleteMany({});
      await this.sneakerModel.insertMany(SNEAKERS_SEED_DATA)

      return {
        message: `Seed executed`,
        itemsInserted: SNEAKERS_SEED_DATA.length
      }
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error: any): never {

    if (error.code === 11000) throw new BadRequestException(`Sneaker already exists in DB: ${JSON.stringify(error.keyValue)}`);

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
