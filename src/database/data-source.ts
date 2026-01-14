import 'reflect-metadata';
import { User } from '../common/entities/user.entity';
import { DataSource } from 'typeorm';
import { Movie } from '../common/entities/movie.entity';
import { Showtime } from 'src/common/entities/showtime.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'movie_reservation',

  entities: [User, Movie, Showtime],
  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
  logging: true,
});

