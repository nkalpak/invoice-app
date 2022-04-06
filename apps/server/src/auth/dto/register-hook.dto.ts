import { IsNumber, IsString } from 'class-validator';

export class RegisterHookDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsNumber()
  timestamp: number;
}
