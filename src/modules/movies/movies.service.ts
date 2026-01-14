import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from 'src/common/entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) { }

  create(dto: CreateMovieDto) {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  async findAllPaginated(page: number = 1, limit: number = 10) {
    const [items, total] = await this.movieRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: string, dto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    return this.movieRepo.save(movie);
  }

  async delete(id: string) {
    const movie = await this.findOne(id); 
    await this.movieRepo.delete(movie.id); 
    return { message: 'Movie deleted successfully' };
  }
}


