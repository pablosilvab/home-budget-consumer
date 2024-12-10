/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('delete-product')
  handleDeleteProduct(@Payload() productData: string) {
    return this.appService.handleDeleteProduct(productData);
  }

}
