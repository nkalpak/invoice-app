import { Body, Controller, Post, Headers } from '@nestjs/common';
import { RegisterHookDto } from './dto/register-hook.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
   * Webhook handler for the post-register event in the user pool
   */
  @Post('register-hook')
  public async registerHook(
    @Body() registerHookDto: RegisterHookDto,
    @Headers('Invoicer-Signature') hmac: string,
  ) {
    return this.authService.registerHook(registerHookDto, hmac, Date.now());
  }
}
