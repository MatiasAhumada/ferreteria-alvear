import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  contact: z.string().optional(),
});

export const updateSupplierSchema = createSupplierSchema.partial();
