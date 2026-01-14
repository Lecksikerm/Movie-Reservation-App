import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create(
            dto.fullName,
            dto.email,
            dto.phoneNumber,
            passwordHash,
        );

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            createdAt: user.createdAt,
        };
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatches) throw new UnauthorizedException('Invalid credentials');

        const accessToken = this.jwtService.sign({ sub: user.id, role: user.role });

        return {
            accessToken,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                createdAt: user.createdAt,
            },
        };
    }
}