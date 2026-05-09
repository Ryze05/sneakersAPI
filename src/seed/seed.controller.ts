import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post()
  @ApiOperation({ summary: 'Reset and load database with test data' })
  @ApiResponse({ status: 201, description: 'Database successfully seeded.' })
  @ApiResponse({ status: 500, description: 'Internal server error during seeding.' })
  executeSeed() {
    return this.seedService.runSeed();
  }
}
