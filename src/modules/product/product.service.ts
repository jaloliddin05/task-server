import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { FileService } from '../file/file.service';
import { TypeService } from '../type/type.service';

Injectable();
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileService: FileService,
    private readonly typeService: TypeService,
  ) {}

  async getAll() {
    const data = await this.productRepository.find({
      relations: {
        url: true,
      },
      order: {
        date: 'DESC',
      },
    });
    return data;
  }

  async getOne(id: string) {
    const data = await this.productRepository
      .findOne({
        where: { id },
        relations: {
          url: true,
          type: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async getByType(id:string) {
    const data = await this.productRepository.find({
      relations: {
        url: true,
      },
      order: {
        date: 'DESC',
      },
      where:{
        type:{
          id
        }
      }
    });
    return data;
  }

  async deleteOne(id: string) {
    await this.deleteImage(id);
    const response = await this.productRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });

    return response;
  }

  async change(
    value: UpdateProductDto,
    id: string,
    file: Express.Multer.File,
    req,
  ) {
    
    if (file) {
      value.url = await this.updateImage(file, id, req);
    }
    if(value.type){
      value.type = await this.typeService.getById(value.type);
    }

    await this.productRepository.update({ id }, value);
    return await this.getOne(id);
  }

  async create(value: CreateProductDto, file: Express.Multer.File, req) {
    if(value.type){
      value.type = await this.typeService.getById(value.type);
    }

    if (file) {
      value.url = await this.uploadImage(file, req);
    }

    const data = this.productRepository.create({ ...value });

    return await this.productRepository.save(data);
  }

  async uploadImage(file: Express.Multer.File, request) {
    const url = await this.fileService.uploadFile(file, request);
    return url;
  }

  async updateImage(file: Express.Multer.File, id: string, request) {
    const data = await this.getOne(id);
    const url = await this.fileService.updateFile(data?.url?.id, file, request);
    return url;
  }

  async deleteImage(id: string) {
    const data = await this.getOne(id);
    if (data?.url?.url) {
      await this.fileService.removeFile(data.url.id);
    }
  }
}
