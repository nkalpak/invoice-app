import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';

@Injectable()
export class GlobalService {
  public readonly httpService: HttpService;
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }
}
