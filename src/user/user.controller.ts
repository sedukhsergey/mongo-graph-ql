import { Controller, Delete, Get, Param } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.userService.deleteUser({ id });
    return {
      success: 'ok',
    };
  }
}
