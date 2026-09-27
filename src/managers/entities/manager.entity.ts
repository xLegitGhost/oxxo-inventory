import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn("uuid")
    managerId: string;
    @Column("text")
    managerFullName: string;
    @Column("float")
    managerSalary: number;
    @Column("text")
    managerEmail: string;
    @Column("text")
    managerPhoneNumber: string;

    @OneToOne(() => Location)
    location: Relation<Location>;
}
