import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity.js';
import { User } from '../../auth/entities/user.entity.js';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  employeeName: string;

  @Column({ type: 'text' })
  employeeLastName: string;

  @Column({ type: 'text' })
  employeePhoneNumber: string;

  @Column({ type: 'text', unique: true })
  employeeEmail: string;

  @Column({ type: 'text', nullable: true })
  employeePhoto: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: 'locationId',
  })
  location: Location;
}
