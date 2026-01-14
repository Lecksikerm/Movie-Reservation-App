import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Movie } from './movie.entity';

@Entity('showtimes')
export class Showtime extends Base {
    @ManyToOne(() => Movie, { eager: true, onDelete: 'CASCADE' })
    movie: Movie;

    @Column({ type: 'timestamptz' })
    startTime: Date;

    @Column({ type: 'timestamptz' })
    endTime: Date;

    @Column()
    totalSeats: number;

    @Column()
    availableSeats: number;
}
