import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository} from 'typeorm';

import { Type } from './type.entity';
import { CreateTypeDto, UpdateTypeDto } from './dto';

Injectable();
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async getAll() {
    const data = await this.typeRepository.find();
    return data
  }


  async getOne(id: string) {
    const data = await this.typeRepository
      .findOne({
        where: { id },
        relations:{
          products:{
            url:true
          }
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data
  }

  async deleteOne(id: string) {
    const response = await this.typeRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });

    return response;
  }

  async change(value: UpdateTypeDto, id: string ) {
    await this.typeRepository.update({ id }, value);
    return await this.getOne(id);
  }

  async create(value: CreateTypeDto,) {
    const data =  this.typeRepository.create(value)
    return await this.typeRepository.save(data);
  }
}
