import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CORS } from './cors.middleware'; // Импорт нового middleware
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '17283946',
      database: 'solo_db',
      synchronize: true, // В продакшене установите false и используйте миграции
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
    }),
    ProductsModule, // Добавление ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CORS).forRoutes('*');
  }
}
