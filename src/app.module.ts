import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './common/auth/auth.module';
import { User } from './common/entities/user.entity';
import { MoviesModule } from './modules/movies/movies.module';
import { Movie } from './common/entities/movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Movie],
        synchronize: false,
        logging: true,
      }),
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }


