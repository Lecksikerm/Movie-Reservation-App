import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsInt, Min } from 'class-validator';

export class CreateShowtimeDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'ID of the movie',
    })
    @IsUUID()
    movieId: string;

    @ApiProperty({
        example: '2026-01-20T18:00:00Z',
        description: 'Show start time (ISO string)',
    })
    @IsDateString()
    startTime: string;

    @ApiProperty({
        example: '2026-01-20T20:30:00Z',
        description: 'Show end time (ISO string)',
    })
    @IsDateString()
    endTime: string;

    @ApiProperty({
        example: 100,
        description: 'Total number of seats for this showtime',
    })
    @IsInt()
    @Min(1)
    totalSeats: number;
}
