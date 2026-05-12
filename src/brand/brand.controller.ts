import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.brandService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(term, updateBrandDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.brandService.remove(term);
  }
}
