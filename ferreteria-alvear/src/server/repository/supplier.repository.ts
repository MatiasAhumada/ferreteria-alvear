import { prisma } from "@/lib/prisma";
import { ISupplierFormValues } from "@/types/supplier.types";

export const supplierRepository = {
  async findAll() {
    return prisma.supplier.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        contact: true,
      },
    });
  },

  async create(data: ISupplierFormValues) {
    return prisma.supplier.create({
      data,
    });
  },
};
