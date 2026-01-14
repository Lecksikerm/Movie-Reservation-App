import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MovieGenre } from 'src/common/entities/movie.entity';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A mind-bending thriller about dreams.' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'https://image.tmdb.org/t/p/w500/xyz.jpg' })
  @IsOptional()
  @IsString()
  posterUrl?: string;

  @ApiProperty({ enum: MovieGenre, example: MovieGenre.ACTION })
  @IsEnum(MovieGenre)
  genre: MovieGenre;
}

