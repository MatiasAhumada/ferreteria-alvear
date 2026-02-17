import { prisma } from "@/lib/prisma";
import { CreateProductInput, UpdateProductInput } from "@/schemas/product.schema";

export const productRepository = {
  async findAll(search?: string) {
    return prisma.product.findMany({
      where: {
        deletedAt: null,
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { barcode: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: {
        supplier: true,
      },
    });
  },

  async create(data: CreateProductInput) {
    return prisma.product.create({
      data,
      include: {
        supplier: true,
      },
    });
  },

  async update(id: string, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        supplier: true,
      },
    });
  },

  async softDelete(id: string) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async getStats() {
    const products = await prisma.product.findMany({
      where: { deletedAt: null },
      select: {
        stockActual: true,
        stockMinimo: true,
        price: true,
      },
    });

    const totalValue = products.reduce(
      (sum, p) => sum + p.stockActual * Number(p.price),
      0
    );

    const criticalStock = products.filter(
      (p) => p.stockActual <= p.stockMinimo
    ).length;

    return {
      totalValue,
      criticalStock,
    };
  },
};
