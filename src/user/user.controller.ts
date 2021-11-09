import { Controller, Delete, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user-persistence/schemas/user.schema';
import { SuccessResponseDto } from '../dto/success-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.userService.loadAllUsers();
  }

  @Delete()
  async delete(@Req() req): Promise<SuccessResponseDto> {
    const user = req.user;
    await this.userService.deleteUser({ id: user.id });
    return {
      success: 'ok',
    };
  }
}
