import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column("text", {
        unique: true
    })
    userEmail: string;

    @Column("text")
    userPassword: string;

    @Column("simple-array", {
        default: "employee"
    })
    userRoles: string[];

    @OneToOne(() => Manager)
    manager: Manager;

    @OneToOne(() => Employee)
    employee: Employee;
}