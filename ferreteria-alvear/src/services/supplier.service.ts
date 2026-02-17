import clientAxios from "@/utils/clientAxios.util";
import { ISupplierFormValues } from "@/types/supplier.types";
import { API_ROUTES } from "@/constants/routes";

export const supplierClientService = {
  async getAll() {
    const response = await clientAxios.get(API_ROUTES.SUPPLIERS);
    return response.data;
  },

  async create(data: ISupplierFormValues) {
    const response = await clientAxios.post(API_ROUTES.SUPPLIERS, data);
    return response.data;
  },
};
