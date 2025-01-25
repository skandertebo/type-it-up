import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(['health', 'ping', 'status', ''])
  health() {
    return {
      status: 'ok',
    }
  }
}
