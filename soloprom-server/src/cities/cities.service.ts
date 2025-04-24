import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCityFromName(name: string) {
    const cities = await this.prisma.citySearch.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    if (!cities || cities.length === 0) {
      return [];
    }

    cities.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(name.toLowerCase());
      const bStartsWith = b.name.toLowerCase().startsWith(name.toLowerCase());

      if (aStartsWith && !bStartsWith) {
        return -1;
      } else if (!aStartsWith && bStartsWith) {
        return 1;
      } else {
        return a.name.length - b.name.length;
      }
    });

    return cities.slice(0, 10);
  }

  async createCities(cities: { name: string }[]) {
    try {
      await this.prisma.citySearch.createMany({
        data: cities,
        skipDuplicates: true,
      });
      return { message: 'Города успешно загружены' };
    } catch (error) {
      console.error('Ошибка загрузки списка городов:', error);
      throw new Error('Failed to load cities');
    }
  }
}
