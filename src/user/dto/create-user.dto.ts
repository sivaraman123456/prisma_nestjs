import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Siva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'siva@gmail.com' })
  @IsEmail()
  email: string;
}
