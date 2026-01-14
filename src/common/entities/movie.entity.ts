import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';


export enum MovieGenre {
    ACTION = 'ACTION',
    DRAMA = 'DRAMA',
    COMEDY = 'COMEDY',
    HORROR = 'HORROR',
    SCIFI = 'SCIFI',
    ROMANCE = 'ROMANCE',
}

@Entity('movies')
export class Movie extends Base {
    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    posterUrl?: string;

    @Column({
        type: 'enum',
        enum: MovieGenre,
    })
    genre: MovieGenre;
}
