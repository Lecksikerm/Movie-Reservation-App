import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/entities/user.entity';


export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty({ enum: UserRole })
    role: UserRole;

    @ApiProperty()
    createdAt: Date;
}
