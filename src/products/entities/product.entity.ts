import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'text' })
  productName: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  countSeal: number;

  @Column({ type: 'uuid', nullable: true })
  provider?: string;
}
