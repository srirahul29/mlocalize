import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.order.create({ data });
  }

  async findAll(userId?: string) {
    if (userId) {
      return this.prisma.order.findMany({ where: { userId }, include: { service: true } });
    }
    return this.prisma.order.findMany({ include: { service: true, user: true } });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { service: true, user: true, payments: true },
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async assignTeam(id: string, teamMembers: string[]) {
    return this.prisma.order.update({
      where: { id },
      data: { teamMembers: teamMembers as any },
    });
  }
}
