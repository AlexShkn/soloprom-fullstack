import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  estimation: number;

  @IsString()
  @IsOptional()
  negative?: string;

  @IsString()
  @IsOptional()
  positive?: string;

  @IsString()
  @IsOptional()
  comment?: string;
}
