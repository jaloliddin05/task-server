import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateTypeDto, UpdateTypeDto } from './dto';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('')
  @ApiOperation({ summary: 'Method: returns all types' })
  @ApiOkResponse({
    description: 'The types were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.typeService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single type by id' })
  @ApiOkResponse({
    description: 'The type was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne( @Param('id') id: string ): Promise<Type> {
    return this.typeService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new type' })
  @ApiCreatedResponse({
    description: 'The type was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateTypeDto) {
    return await this.typeService.create(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating type' })
  @ApiOkResponse({
    description: 'Type was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateTypeDto,
    @Param('id') id: string,
  ) {
    return await this.typeService.change(
      data,
      id
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting type' })
  @ApiOkResponse({
    description: 'Type was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.typeService.deleteOne(id);
  }
}
