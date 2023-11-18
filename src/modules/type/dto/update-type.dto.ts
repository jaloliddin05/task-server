import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateTypeDto {
  @ApiProperty({
    description: `nameUz`,
    example: 'Type nomi',
  })
  @IsOptional()
  @IsString()
  readonly nameUz: string;

  @ApiProperty({
    description: `nameRu`,
    example: 'тип',
  })
  @IsOptional()
  @IsString()
  readonly nameRu: string;

  @ApiProperty({
    description: `nameEn`,
    example: 'Type',
  })
  @IsOptional()
  @IsString()
  readonly nameEn: string;

  @ApiProperty({
    description: `description`,
    example: '....',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export default UpdateTypeDto;
