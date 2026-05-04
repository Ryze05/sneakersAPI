import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { PaginationSneakerDto } from './dto/pagination-sneaker.dto';

@Controller('sneaker')
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Post()
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakerService.create(createSneakerDto);
  }

  @Get()
  findAll(@Query() paginationSneakerDto: PaginationSneakerDto) {
    return this.sneakerService.findAll(paginationSneakerDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.sneakerService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    return this.sneakerService.update(+id, updateSneakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sneakerService.remove(+id);
  }
}
