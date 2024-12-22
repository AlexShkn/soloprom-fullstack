import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'; //  Создайте этот DTO для валидации данных
import { UpdateUserDto } from './dto/update-user.dto'; // Создайте этот DTO
import { JwtAuthGuard } from './guards/jwt-auth.guard'; //  Guard для защиты маршрутов

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard) // Защищенный маршрут
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.findUserById(req.user.id); //  req.user предоставляется JwtAuthGuard
  }

  @UseGuards(JwtAuthGuard) // Защищенный маршрут
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto); // Добавьте метод updateUser в UserService
  }

  //Добавьте другие методы UserController по мере необходимости. Например:
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
}
