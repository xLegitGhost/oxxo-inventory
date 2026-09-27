import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Location } from "../../locations/entities/location.entity.js";

@Entity()
export class Region {
    @PrimaryGeneratedColumn("increment")
    regionId: number;

    @Column("text", {
        unique: true
    })
    regionName: string;
    @Column("simple-array")
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];

}
