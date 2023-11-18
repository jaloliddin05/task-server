import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';


@Entity({ name: 'file' })
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  path: string;

  @OneToOne(()=>Product, product=>product.url,{
    onDelete:"CASCADE",
    cascade:true
  })
  product:Product
}
