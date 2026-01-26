import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { UserRole } from 'src/common/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Showtimes')
@Controller('showtimes')
export class ShowtimesController {
    constructor(private readonly showtimesService: ShowtimesService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Post('/create')
    create(@Body() dto: CreateShowtimeDto) {
        return this.showtimesService.create(dto);
    }

    @Get('/all')
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.showtimesService.findAll(+page, +limit);
    }

    @Get('/movie/:movieId')
    findByMovie(@Param('movieId') movieId: string) {
        return this.showtimesService.findByMovie(movieId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Patch('/:id')
    update(@Param('id') id: string, @Body() dto: UpdateShowtimeDto) {
        return this.showtimesService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.showtimesService.delete(id);
    }
}

