/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Product, ProductStatus } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from './entity/price-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async handleDeleteProduct(productData: string): Promise<void> {
    const productDataObj = JSON.parse(productData);
    const productId = productDataObj.id;

    console.log(`Received product ID: ${productId}`);




    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (product) {

      await this.priceHistoryRepository.delete({ product });


      product.status = ProductStatus.DELETED;  
      await this.productRepository.save(product);
      console.log(`Producto con ID ${productId} marcado como DELETED`);
    } else {
      console.log(`Producto con ID ${productId} no encontrado`);
    }
  }
}