import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity('users')
export class User extends Base {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber: string;

    @Exclude()
    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;
}
