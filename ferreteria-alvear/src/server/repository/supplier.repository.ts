import { prisma } from "@/lib/prisma";

export const supplierRepository = {
  async findAll() {
    return prisma.supplier.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });
  },
};
