import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from '../file/file.module';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),FileModule,TypeModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
