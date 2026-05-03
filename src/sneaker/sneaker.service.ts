import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneaker } from './entities/sneaker.entity';
import { Model } from 'mongoose';

@Injectable()
export class SneakerService {

  private readonly logger = new Logger('SneackerService');

  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel: Model<Sneaker>
  ) {}

  async create(createSneakerDto: CreateSneakerDto): Promise<Sneaker> {
    try {
      const sneaker = await this.sneakerModel.insertOne(createSneakerDto);
      return sneaker;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all sneaker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sneaker`;
  }

  update(id: number, updateSneakerDto: UpdateSneakerDto) {
    return `This action updates a #${id} sneaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} sneaker`;
  }

  private handleException(error: any): never {

    if (error.code === 11000) throw new BadRequestException(`Sneaker already exists in DB: ${JSON.stringify(error.keyValue)}`);

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
