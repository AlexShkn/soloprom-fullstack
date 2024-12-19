import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  subcategory: Subcategory;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  url: string;

  @Column()
  image: string;

  @Column({ type: 'decimal' })
  defaultPrice: number;

  @Column({ type: 'boolean' })
  isPopular: boolean;

  @Column({ type: 'jsonb', nullable: true })
  sizes: object;

  @Column({ type: 'jsonb', nullable: true })
  volumes: object;

  @Column({ type: 'simple-array', nullable: true })
  group: string[];

  @Column({ nullable: true })
  delivery: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  country: string;

  @Column({ type: 'simple-array', nullable: true })
  regalia: string[];
}
