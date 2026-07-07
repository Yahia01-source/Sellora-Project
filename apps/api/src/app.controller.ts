import { Controller, Get } from '@nestjs/common';
import { SkipTenant } from './tenant/guards/tenant.guard';

@Controller()
export class AppController {
  @Get('health')
  @SkipTenant()
  health(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
