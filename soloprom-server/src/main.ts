import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ScraperJob } from './jobs/scraper.job';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const scraperJob = app.get(ScraperJob);
  // await scraperJob.handle();

  app.use(cors({ origin: 'http://localhost:3000' })); // CORS для вашего клиента
  await app.listen(3001);

  // const prisma = new PrismaClient();
  // const products = await prisma.product.findMany({
  //   where: { isPopular: true },
  // });
  // console.log(products);
}
bootstrap();
