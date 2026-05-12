import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './entities/brand.entity';
import { HydratedDocument, isValidObjectId, Model } from 'mongoose';

@Injectable()
export class BrandService {

  private readonly logger = new Logger('BrandService');

  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand> 
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const brand = await this.brandModel.create(createBrandDto)
      return brand;

    } catch(error) {
      this.handleException(error)
    }
  }

  async findAll() {
    return await this.brandModel.find();
  }

  async findOne(term: string): Promise<HydratedDocument<Brand>>{
    
    let brand: HydratedDocument<Brand> | null = null; 
    
    if (isValidObjectId(term)) {
      brand = await this.brandModel.findById(term)
    }

    if (!brand) {
      brand = await this.brandModel.findOne({
        name: {
          $regex: term.trim()
        },
        isActive: true
      }).sort({ name: 1 })
    }

    if (!brand) {
      throw new BadRequestException(`Brand with id or name "${term}" not found`)
    }

    return brand;
  }

  async update(term: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(term);
    try {
      brand.set(updateBrandDto)
      await brand.save()
      return brand
    } catch(error) {
      this.handleException(error);
    }
  }

  async remove(term: string): Promise<{message: string}> {
    const brand = await this.findOne(term)
  
    try {
      await brand.updateOne({
        isActive: false
      });
      return {
        message: `brand with name "${brand.name}" has been deactivated`
      }
    } catch(error) {
      this.handleException(error);
    }
  }

  private handleException(error: any): never {

    if (error.code === 11000) throw new BadRequestException(`Sneaker already exists in DB: ${JSON.stringify(error.keyValue)}`);

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
