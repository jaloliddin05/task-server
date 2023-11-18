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
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { MulterStorage } from 'src/infra/helpers';
import { FileUploadValidationForUpdate } from 'src/infra/validators';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  @ApiOperation({ summary: 'Method: returns all product' })
  @ApiOkResponse({
    description: 'The product were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.productService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single product by id' })
  @ApiOkResponse({
    description: 'The product was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getOne(id);
  }

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: creates new type' })
  @ApiCreatedResponse({
    description: 'The type was created successfully',
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: MulterStorage('uploads/image/product'),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async saveData(
    @Body() data: CreateProductDto,
    @UploadedFile(FileUploadValidationForUpdate) file: Express.Multer.File,
    @Req() req,
  ) {
    return await this.productService.create(data, file, req);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updating product' })
  @ApiOkResponse({
    description: 'product was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateProductDto,
    @Param('id') id: string,
    @UploadedFile(FileUploadValidationForUpdate) file: Express.Multer.File,
    @Req() req,
  ) {
    return await this.productService.change(data, id,file,req);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting product' })
  @ApiOkResponse({
    description: 'product was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.productService.deleteOne(id);
  }
}
