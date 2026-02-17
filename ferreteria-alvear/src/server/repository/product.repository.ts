import { prisma } from "@/lib/prisma";
import { IProductFormValues } from "@/types/product.types";

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

  async create(data: IProductFormValues) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        barcode: data.barcode,
        stockActual: data.stockActual,
        stockMinimo: data.stockMinimo,
        cost: data.cost,
        profitMargin: data.profitMargin,
        price: data.price,
        supplier: {
          connect: { id: data.supplierId },
        },
      },
      include: {
        supplier: true,
      },
    });
  },

  async update(id: string, data: Partial<IProductFormValues>) {
    return prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.barcode && { barcode: data.barcode }),
        ...(data.stockActual !== undefined && { stockActual: data.stockActual }),
        ...(data.stockMinimo !== undefined && { stockMinimo: data.stockMinimo }),
        ...(data.cost && { cost: data.cost }),
        ...(data.profitMargin && { profitMargin: data.profitMargin }),
        ...(data.price && { price: data.price }),
        ...(data.supplierId && {
          supplier: {
            connect: { id: data.supplierId },
          },
        }),
      },
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
