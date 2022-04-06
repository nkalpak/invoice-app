import { Body, Controller, Post, Headers } from '@nestjs/common';
import { RegisterHookDto } from './dto/register-hook.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-hook')
  public async registerHook(
    @Body() registerHookDto: RegisterHookDto,
    @Headers('Invoicer-Signature') hmac: string,
  ) {
    console.log('REG HOOK DTO', registerHookDto);
    console.log('HMAC', hmac);

    return this.authService.registerHook(registerHookDto, hmac);
  }
}
