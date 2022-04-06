import { Global, Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise';
import { GlobalService } from './global.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
