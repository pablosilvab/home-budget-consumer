/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { PriceHistory } from './entity/price-history.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Product, PriceHistory],
      synchronize: process.env.TYPEORM_SYNC === 'true',
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
    }),
    TypeOrmModule.forFeature([Product, PriceHistory]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}