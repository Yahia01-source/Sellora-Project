import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dashboardData } from './dashboard.data';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  getDashboard() {
    return dashboardData;
  }
}