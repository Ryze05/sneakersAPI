import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneaker } from './entities/sneaker.entity';
import { isValidObjectId, Model, SortOrder } from 'mongoose';
import { PaginationSneakerDto } from './dto/pagination-sneaker.dto';
import { PaginatedResponse } from '../common/interfaces/pagination.interface';
import { SneakerFilters } from './interfaces/sneaker-filters.interface';

@Injectable()
export class SneakerService {

  private readonly logger = new Logger('SneackerService');

  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel: Model<Sneaker>
  ) { }

  async create(createSneakerDto: CreateSneakerDto): Promise<Sneaker> {
    try {
      const sneaker = await this.sneakerModel.create(createSneakerDto);
      return sneaker;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationSneakerDto: PaginationSneakerDto): Promise<PaginatedResponse<Sneaker>> {

    const { limit = 10, offset = 0, model, brand, color, size, minPrice, maxPrice, isLimitedEdition, sortBy = 'price', sortOrder = 'asc' } = paginationSneakerDto;

    const query: SneakerFilters = {};

    if (model) query.model = { $regex: model, $options: 'i' };

    if (brand) query.brand = { $regex: brand, $options: 'i' };

    if (color) query.color = color.toLowerCase();

    if (isLimitedEdition !== undefined) query.isLimitedEdition = isLimitedEdition;

    if (size) query.size = size;

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};

      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Ordenación dinámica
    const key = ['brand', 'model', 'size', 'price'].includes(sortBy) ? sortBy : 'price';
    const value = (sortOrder === 'desc') ? -1 : 1;
    const sort: { [key: string]: SortOrder } = { [key] :  value};

    const [sneakers, total] = await Promise.all([
      this.sneakerModel.find(query).limit(limit).skip(offset).sort(sort).exec(),
      this.sneakerModel.countDocuments(query)
    ])

    const lastPage = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    if (currentPage > lastPage && total > 0) {
      throw new BadRequestException(`La página ${currentPage} no existe. La última es la ${lastPage}`);
    }

    return {
      data: sneakers,
      total,
      limit,
      offset,
      currentPage,
      lastPage
    };
  }

  async findOne(term: string): Promise<Sneaker> {

    let sneacker: Sneaker | null = null;
  
    if (isValidObjectId(term)) {
      sneacker = await this.sneakerModel.findById(term);
    }

    if (!sneacker) {
      sneacker = await this.sneakerModel.findOne({sku: term}); 
    }

    if (!sneacker) throw new NotFoundException();

    return sneacker
  }

  update(term: string, updateSneakerDto: UpdateSneakerDto) {
    return `This action updates a #${term} sneaker`;
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
