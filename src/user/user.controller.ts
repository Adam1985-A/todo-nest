import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}