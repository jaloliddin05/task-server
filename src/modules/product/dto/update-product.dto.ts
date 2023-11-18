import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateProductDto {
  @ApiProperty({
    description: `nameUz`,
    example: 'Type nomi',
  })
  @IsOptional()
  @IsString()
  readonly nameUz: string;

  @ApiProperty({
    description: `cost`,
    example: '100',
  })
  @IsOptional()
  @IsString()
  readonly cost: string;

  @ApiProperty({
    description: `address`,
    example: 'Type',
  })
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiProperty({
    description: `Product image`,
    example: 'file',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  url;
}

export default UpdateProductDto;
