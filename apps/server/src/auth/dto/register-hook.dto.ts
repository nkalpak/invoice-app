import { IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Exclude()
export class RegisterHookDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsNumber()
  timestamp: number;
}
