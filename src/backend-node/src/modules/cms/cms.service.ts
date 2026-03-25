import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  async createPage(data: any) {
    return this.prisma.cmsPage.create({ data });
  }

  async getPage(slug: string) {
    return this.prisma.cmsPage.findUnique({ where: { slug } });
  }

  async getAllPages() {
    return this.prisma.cmsPage.findMany();
  }

  async createBlog(data: any) {
    return this.prisma.blog.create({ data });
  }

  async getBlogBySlug(slug: string) {
    return this.prisma.blog.findUnique({
      where: { slug },
      include: { author: { select: { name: true, email: true } } },
    });
  }

  async getAllBlogs() {
    return this.prisma.blog.findMany({
      include: { author: { select: { name: true } } },
    });
  }
}
