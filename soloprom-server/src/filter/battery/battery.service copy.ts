// import { PrismaService } from '@/prisma/prisma.service';
// import { ProductsService } from '@/products/products.service';
// import { Injectable } from '@nestjs/common';

// interface FilterParams {
//   vehicleType?: string;
//   brand?: string;
//   model?: string;
//   voltage?: string;
//   defaultSize?: string;
//   plates?: string;
//   container?: string;
// }

// @Injectable()
// export class BatteryService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly productsService: ProductsService,
//   ) {}

//     async getFilteredBatteries(
//       filter: FilterParams,
//     ): Promise<(Battery & { compatibleVehicles: Vehicle[] })[]> {
//       const whereClause: any = {};

//       if (filter.vehicleType) {
//         whereClause.compatibleVehicles = {
//           some: {
//             vehicleType: filter.vehicleType,
//           },
//         };
//       }

//       if (filter.brand) {
//         whereClause.compatibleVehicles = {
//           some: {
//             brand: filter.brand,
//           },
//         };
//       }

//       if (filter.model) {
//         whereClause.compatibleVehicles = {
//           some: {
//             model: filter.model,
//           },
//         };
//       }

//       if (filter.voltage) {
//         whereClause.voltage = filter.voltage;
//       }

//       if (filter.length) {
//         whereClause.length = filter.length;
//       }

//       if (filter.width) {
//         whereClause.width = filter.width;
//       }

//       if (filter.height) {
//         whereClause.height = filter.height;
//       }

//       if (filter.plateType) {
//         whereClause.plateType = filter.plateType;
//       }

//       if (filter.capacity) {
//         whereClause.capacity = filter.capacity;
//       }

//       return this.prisma.battery.findMany({
//         where: whereClause,
//         include: {
//           compatibleVehicles: true,
//         },
//       });
//     }

//   async getAvailableOptions(filters: FilterParams): Promise<{
//     options: {
//       vehicleType: string[];
//       brand: string[];
//       model: string[];
//       voltage: string[];
//       defaultSize: string[];
//       plates: string[];
//       container: string[];
//     };
//     totalCount: number;
//   }> {
//     const whereClause: any = {
//       AND: [], // Используем AND, чтобы добавлять условия
//     };

//     // Добавляем фильтры для связанных Vehicle
//     const vehicleFilters: any = {};
//     if (filters.vehicleType) {
//       vehicleFilters.vehicleType = filters.vehicleType;
//     }
//     if (filters.brand) {
//       vehicleFilters.brand = filters.brand;
//     }
//     if (filters.model) {
//       vehicleFilters.model = filters.model;
//     }

//     // Если есть фильтры по Vehicle, добавляем условие через compatibleVehicles.some
//     if (Object.keys(vehicleFilters).length > 0) {
//       whereClause.AND.push({
//         compatibleVehicles: {
//           some: vehicleFilters,
//         },
//       });
//     }

//     if (filters.voltage) {
//       whereClause.AND.push({ voltage: filters.voltage });
//     }

//     if (filters.defaultSize) {
//       whereClause.AND.push({ defaultSize: filters.defaultSize });
//     }

//     if (filters.plates) {
//       whereClause.AND.push({ plates: filters.plates });
//     }

//     if (filters.container) {
//       whereClause.AND.push({ container: filters.container });
//     }

//     // Если whereClause.AND пустой, удаляем его, чтобы не было ошибки
//     if (whereClause.AND.length === 0) {
//       delete whereClause.AND;
//     }

//     const batteries = await this.prisma.battery.findMany({
//       where: whereClause,
//       include: {
//         compatibleVehicles: true,
//       },
//     });

//     const vehicleType = Array.from(
//       new Set(
//         batteries.flatMap((battery) =>
//           battery.compatibleVehicles.map((v) => v.vehicleType),
//         ),
//       ),
//     ).sort();
//     const brand = Array.from(
//       new Set(
//         batteries.flatMap((battery) =>
//           battery.compatibleVehicles.map((v) => v.brand),
//         ),
//       ),
//     ).sort();
//     const model = Array.from(
//       new Set(
//         batteries.flatMap((battery) =>
//           battery.compatibleVehicles.map((v) => v.model),
//         ),
//       ),
//     ).sort();

//     const voltage = Array.from(new Set(batteries.map((b) => b.voltage)))
//       .map((v) => String(v))
//       .sort((a, b) => Number(a) - Number(b));
//     const defaultSize = Array.from(new Set(batteries.map((b) => b.defaultSize)))
//       .map((l) => String(l))
//       .sort((a, b) => Number(a) - Number(b));

//     const plates = Array.from(new Set(batteries.map((b) => b.plates))).sort();

//     const container = Array.from(new Set(batteries.map((b) => b.container)))
//       .map((c) => String(c))
//       .sort((a, b) => Number(a) - Number(b));

//     const filterOptions = {
//       voltage: voltage,
//       defaultSize: defaultSize,
//       plates: plates,
//       container: container,
//     };

//     console.log(filterOptions);

//     const { totalCount } = await this.productsService.getFilterOptions({
//       categoryName: 'battery',
//       filters: Object.keys(filters).length ? filterOptions : '',
//     });

//     console.log(totalCount);

//     return {
//       options: {
//         vehicleType,
//         brand,
//         model,
//         voltage,
//         defaultSize,
//         plates,
//         container,
//       },
//       totalCount,
//     };
//   }
// }
