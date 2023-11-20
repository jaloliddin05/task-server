import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';
import { Type } from '../type/type.entity';


@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  nameUz: string;

  @Column({type:"varchar", nullable:true})
  cost: string;

  @Column({type:"varchar", nullable:true})
  address: string;

  @Column({type: 'timestamp', default: () => 'NOW()' })
  date: string

  @OneToOne(()=>FileEntity, file=>file.product, {
    onDelete:"SET NULL"
  })
  @JoinColumn()
  url: FileEntity

  @ManyToOne(()=>Type, type=>type.products,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  type:Type
}
