import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../regions/entities/region.entity.js";
import { Employee } from "../../employees/entities/employee.entity.js";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("increment")
    locationId: number;
    @Column("text")
    locationName: string;
    @Column("text")
    locationAddress: string;
    @Column("simple-array")
    locationLatLng: number[];

    @OneToOne(() => Manager)
    @JoinColumn({
        name: "managerId"
    })
    manager: Relation<Manager>

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];

}
