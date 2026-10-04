import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../regions/entities/region.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("increment")
    locationId: number;

    @ApiProperty({ default: "Ocso Juriquilla" })
    @Column("text")
    locationName: string;

    @ApiProperty({ default: "Avenida tal número 76 220" })
    @Column("text")
    locationAddress: string;

    @ApiProperty({ default: [12, 12] })
    @Column("simple-array")
    locationLatLng: number[];

    @OneToOne(() => Manager, { eager: true })
    @JoinColumn({
        name: "managerId"
    })
    manager: Relation<Manager>;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
