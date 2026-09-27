import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity.js';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({type: 'text', nullable: true})
  photoUrl: string;

  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: 'locationId',
  })
  location: Location;
}
