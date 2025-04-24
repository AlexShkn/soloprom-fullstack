import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':name')
  async getCityFromName(@Param('name') name: string) {
    return this.citiesService.getCityFromName(name);
  }

  @Post('load')
  async loadCities(@Body() cities: { name: string }[]) {
    return this.citiesService.createCities(cities);
  }
}
