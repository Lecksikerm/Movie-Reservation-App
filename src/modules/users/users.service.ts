import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/common/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    async create(
        fullName: string,
        email: string,
        phoneNumber: string,
        passwordHash: string,
    ): Promise<User> {
        const existing = await this.repo.findOne({
            where: [{ email }, { phoneNumber }],
        });

        if (existing) throw new ConflictException('Email or phone number already exists');

        const user = this.repo.create({ fullName, email, phoneNumber, passwordHash });
        return this.repo.save(user);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({ where: { email } });
    }

    findById(id: string): Promise<User | null> {
        return this.repo.findOne({ where: { id } });
    }

    async promoteToAdmin(id: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) throw new NotFoundException('User not found');
        user.role = UserRole.ADMIN;
        await this.repo.save(user);
    }
}
