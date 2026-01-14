import { IsEmail, MinLength, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    fullName: string;

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+2347039898758' })
    @Matches(/^\+?\d{10,15}$/, {
        message: 'Phone number must be valid and include country code',
    })
    phoneNumber: string;

    @ApiProperty({ example: 'strongPassword123' })
    @MinLength(8)
    password: string;
}

