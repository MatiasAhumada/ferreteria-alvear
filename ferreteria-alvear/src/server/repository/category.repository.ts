import { prisma } from "@/lib/prisma";

export const categoryRepository = {
  async findAll() {
    return prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });
  },
};
