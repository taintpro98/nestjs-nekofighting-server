import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterNormalDto {
  @ApiProperty({
    example: 'prochicken3',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Test1234@',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
