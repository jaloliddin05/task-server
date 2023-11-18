import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';


@Entity('type')
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  nameUz: string;

  @Column({type:"varchar", nullable:true})
  nameRu: string;

  @Column({type:"varchar", nullable:true})
  nameEn: string;

  @Column({type:"text", nullable:true})
  description: string

  @OneToMany(()=>Product, product=>product.type)
  products:Product[]
}
