import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  getDashboard(
    @Req() req: any,
    @Query('period') period: '7D' | '30D' | '90D' = '7D',
  ) {
    return this.dashboardService.getDashboard(
      req.user.id,
      period,
    );
  }
}