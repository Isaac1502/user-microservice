import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    first_name;

    @Column()
    last_name;

    @Column({
        unique: true
    })
    email;

    @Column({
        select: false
    })
    password;

    @Column()
    is_ambassador;

    get name() {
        return this.first_name + ' ' + this.last_name;
    }
}
