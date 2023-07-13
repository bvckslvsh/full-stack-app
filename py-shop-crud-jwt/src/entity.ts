import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_table')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    additional_about: string;
}