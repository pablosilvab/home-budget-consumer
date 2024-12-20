import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.priceHistories)
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  date: Date;

  @Column()
  supermarket: string;


  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;
}
