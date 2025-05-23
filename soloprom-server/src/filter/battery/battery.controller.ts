import { Controller, Get, Query } from '@nestjs/common';
import { BatteryService } from './battery.service';
import { Battery, Vehicle } from '@prisma/client';

interface FilterParams {
  vehicleType?: string;
  brand?: string;
  model?: string;
  voltage?: string;
  defaultSize?: string;
  plates?: string;
  container?: string;
}
interface BatteryWithVehicles extends Battery {
  compatibleVehicles: Vehicle[];
}

interface FilteredBatteriesResult {
  batteries: BatteryWithVehicles[];
  totalCount: number;
}

@Controller('batteries')
export class BatteryController {
  constructor(private readonly batteryService: BatteryService) {}

  @Get()
  async getFilteredBatteries(
    @Query() filter: FilterParams,
  ): Promise<(Battery & { compatibleVehicles: Vehicle[] })[]> {
    return this.batteryService.getFilteredBatteries(filter);
  }

  @Get('options')
  async getAvailableOptions(@Query() filters: FilterParams): Promise<{
    options: {
      vehicleType: string[];
      brand: string[];
      model: string[];
      voltage: string[];
      defaultSize: string[];
      plates: string[];
      container: string[];
    };
    totalCount: number;
  }> {
    console.log('filters', filters);
    return this.batteryService.getAvailableOptions(filters);
  }
}
