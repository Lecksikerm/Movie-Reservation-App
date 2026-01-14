import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserRole } from '../../common/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    // PUBLIC
    @Get('/all')
    findAll(@Query() query: PaginationDto) {
        const { page, limit } = query;
        return this.moviesService.findAllPaginated(page, limit);
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(id);
    }

    // ADMIN ONLY
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Post('/create')
    create(@Body() dto: CreateMovieDto) {
        return this.moviesService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Patch('/:id')
    update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
        return this.moviesService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth('Bearer')
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a movie by ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'Movie deleted successfully' })
    @ApiResponse({ status: 404, description: 'Movie not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async remove(@Param('id') id: string) {
        return this.moviesService.delete(id); 
    }
}

