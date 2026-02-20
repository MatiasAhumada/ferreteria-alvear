import { Category as PrismaCategory } from "@prisma/client";

export type { PrismaCategory };

export interface ICategory extends PrismaCategory {}

export interface ICategoryFormValues {
  name: string;
}
