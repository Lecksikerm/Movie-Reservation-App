import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login user and receive token' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('Bearer')
    @ApiOperation({ summary: 'Get current logged-in user' })
    @Get('/me')
    getMe(@Req() req: any) {
        return req.user;
    }
}
