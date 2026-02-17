import { Supplier as PrismaSupplier } from "@prisma/client";

export type { PrismaSupplier };

export interface ISupplier extends PrismaSupplier {}

export interface ISupplierFormValues {
  name: string;
  contact: string | null;
}
