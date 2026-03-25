import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<Service> {
    return this.prisma.service.create({ data });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany({ where: { status: true } });
  }

  async findOne(id: string): Promise<Service | null> {
    return this.prisma.service.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<Service> {
    return this.prisma.service.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Service> {
    return this.prisma.service.update({ where: { id }, data: { status: false } });
  }
}
