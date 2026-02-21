import { Product as PrismaProduct, Supplier as PrismaSupplier, Category as PrismaCategory } from "@prisma/client";

export type { PrismaProduct, PrismaSupplier, PrismaCategory };

export interface IProductWithSupplier extends PrismaProduct {
  supplier: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface IProductFormValues extends Omit<
  PrismaProduct,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "supplierId" | "categoryId" | "cost" | "profitMargin" | "price"
> {
  cost: number;
  profitMargin: number;
  price: number;
  supplierId: string;
  categoryId: string;
}
