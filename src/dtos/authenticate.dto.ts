import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LoginDefaultDto {
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

export class Accel3LoginCallbackQueryDto {
  @IsNotEmpty()
  @IsUUID(4)
  accel3_id: string;
}