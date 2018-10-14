import { Controller, Get } from 'routing-controllers';

@Controller('')
export class IndexController {
  @Get('/health-check')
  healthCheck() {
    return 'Ok';
  }
}
