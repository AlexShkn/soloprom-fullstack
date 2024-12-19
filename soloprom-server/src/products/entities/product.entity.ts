import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({ type: 'jsonb', nullable: true })
  sizes: object;

  @Column({ type: 'jsonb', nullable: true })
  volumes: object;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  defaultPrice: number;

  @Column({ type: 'text', nullable: true, array: true })
  group: string[];

  @Column({ type: 'text', nullable: true })
  delivery: string;

  @Column({ type: 'text', nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  brand: string;

  @Column({ type: 'text', nullable: true })
  country: string;

  @Column({ type: 'boolean', default: false })
  isPopular: boolean;

  @Column({ type: 'text', nullable: true })
  url: string;

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  subcategory: string;

  @ManyToOne(() => Category, (category) => category.products) // Изменено: теперь Category
  @JoinColumn({ name: 'categoryId' })
  categoryEntity: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'subcategoryId' })
  subcategoryEntity: Subcategory;
}
