import { Product as PrismaProduct, Supplier as PrismaSupplier } from "@prisma/client";

export type { PrismaProduct, PrismaSupplier };

export interface IProductWithSupplier extends PrismaProduct {
  supplier: {
    id: string;
    name: string;
  };
}

export interface IProductFormValues extends Omit<
  PrismaProduct,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "supplierId" | "cost" | "profitMargin" | "price"
> {
  cost: number;
  profitMargin: number;
  price: number;
  supplierId: string;
}
