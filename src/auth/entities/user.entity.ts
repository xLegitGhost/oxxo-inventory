import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}