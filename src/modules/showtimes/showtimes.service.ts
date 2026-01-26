import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from 'src/common/entities/showtime.entity';
import { Movie } from 'src/common/entities/movie.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimesService {
    constructor(
        @InjectRepository(Showtime)
        private readonly showtimeRepo: Repository<Showtime>,

        @InjectRepository(Movie)
        private readonly movieRepo: Repository<Movie>,
    ) { }

    async create(dto: CreateShowtimeDto) {
        const movie = await this.movieRepo.findOne({
            where: { id: dto.movieId },
        });

        if (!movie) throw new NotFoundException('Movie not found');

        const showtime = this.showtimeRepo.create({
            movie,
            startTime: new Date(dto.startTime),
            endTime: new Date(dto.endTime),
            totalSeats: dto.totalSeats,
            availableSeats: dto.totalSeats,
        });

        return this.showtimeRepo.save(showtime);
    }

    async findAll(page = 1, limit = 10) {
        const [items, total] = await this.showtimeRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { startTime: 'ASC' },
        });

        return {
            items,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

    async findByMovie(movieId: string) {
        return this.showtimeRepo.find({
            where: { movie: { id: movieId } },
            order: { startTime: 'ASC' },
        });
    }

    async findOne(id: string) {
        const showtime = await this.showtimeRepo.findOne({ where: { id } });
        if (!showtime) throw new NotFoundException('Showtime not found');
        return showtime;
    }

    async update(id: string, dto: UpdateShowtimeDto) {
        const showtime = await this.findOne(id);

        if (dto.totalSeats) {
            const diff = dto.totalSeats - showtime.totalSeats;
            showtime.availableSeats += diff;
            showtime.totalSeats = dto.totalSeats;
        }

        Object.assign(showtime, {
            ...dto,
            startTime: dto.startTime ? new Date(dto.startTime) : showtime.startTime,
            endTime: dto.endTime ? new Date(dto.endTime) : showtime.endTime,
        });

        return this.showtimeRepo.save(showtime);
    }

    async delete(id: string) {
        const showtime = await this.findOne(id);
        await this.showtimeRepo.delete(showtime.id);
        return { message: 'Showtime deleted successfully' };
    }
}

