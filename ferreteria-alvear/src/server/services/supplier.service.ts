import { supplierRepository } from "@/server/repository/supplier.repository";

export const supplierService = {
  async getAllSuppliers() {
    return supplierRepository.findAll();
  },
};
