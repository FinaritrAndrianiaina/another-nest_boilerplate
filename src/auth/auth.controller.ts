import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiQuery({ name: 'userId', required: false })
  async login(
    @Query('userId') userId: string,
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    if(Boolean(userId)){
      loginDto.id = userId  
    }
    const user = await this.usersService.login(loginDto);
    return this.authService.createToken(user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
