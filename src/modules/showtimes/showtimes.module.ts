import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import { Showtime } from 'src/common/entities/showtime.entity';
import { Movie } from 'src/common/entities/movie.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Showtime, Movie]) 
  ],
  providers: [ShowtimesService],
  controllers: [ShowtimesController]
})
export class ShowtimesModule {}
