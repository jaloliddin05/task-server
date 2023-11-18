import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateProductDto {
  @ApiProperty({
    description: `nameUz`,
    example: 'Type nomi',
  })
  @IsNotEmpty()
  @IsString()
  readonly nameUz: string;

  @ApiProperty({
    description: `cost`,
    example: '100',
  })
  @IsNotEmpty()
  @IsString()
  readonly cost: string;

  @ApiProperty({
    description: `address`,
    example: 'address',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({
    description: `type`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  type:string

  @ApiProperty({
    description: `Product image`,
    example: 'file',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  url;
}

export default CreateProductDto;
