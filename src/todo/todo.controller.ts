import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';


@Controller('todos')
@UseGuards(JwtAuthGuard) // Apply JWT guard to all routes in this controller
export class TodoController {
  constructor(private todoService: TodoService) {}

 //Create a new todo item for the authenticated user
  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.todoService.create(body, req.user);
  }

  //Get a single todo item by ID for the authenticated user
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.todoService.findOne(id, req.user.userId);
  }

 //Get all todo items for the authenticated user
  @Get()
  findAll(@Req() req: any) {
    return this.todoService.findAll(req.user.userId);
  }

  
 @Put(':id')
update(
  @Param('id', ParseIntPipe) id: number, 
  @Body() body: any,
   @Req() req: any,
  ) {
  
  return this.todoService.update(id, body, req.user.userId); // ✅ pass full body
}

  
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number, 
    @Req() req: any,
  ) {
    return this.todoService.delete(id, req.user.userId);
  }

}