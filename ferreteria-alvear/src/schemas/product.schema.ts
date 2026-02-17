import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  barcode: z.string().min(1, "El código de barras es requerido"),
  stockActual: z.number().int().min(0, "El stock debe ser mayor o igual a 0"),
  stockMinimo: z.number().int().min(0, "El stock mínimo debe ser mayor o igual a 0"),
  cost: z.number().positive("El costo debe ser mayor a 0"),
  profitMargin: z.number().min(0, "El margen debe ser mayor o igual a 0"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  supplierId: z.string().min(1, "El proveedor es requerido"),
});

export const updateProductSchema = createProductSchema.partial();
