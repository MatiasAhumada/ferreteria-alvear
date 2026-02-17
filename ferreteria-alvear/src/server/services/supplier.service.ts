import { supplierRepository } from "@/server/repository/supplier.repository";
import { ISupplierFormValues } from "@/types/supplier.types";

export const supplierService = {
  async getAllSuppliers() {
    return supplierRepository.findAll();
  },

  async createSupplier(data: ISupplierFormValues) {
    return supplierRepository.create(data);
  },
};
