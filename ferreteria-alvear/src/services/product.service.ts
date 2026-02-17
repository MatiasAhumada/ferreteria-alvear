import clientAxios from "@/utils/clientAxios.util";
import { IProductFormValues } from "@/types/product.types";
import { API_ROUTES } from "@/constants/routes";

export const productClientService = {
  async getAll(search?: string) {
    const params = search ? { search } : {};
    const response = await clientAxios.get(API_ROUTES.PRODUCTS, { params });
    return response.data;
  },

  async create(data: IProductFormValues) {
    const response = await clientAxios.post(API_ROUTES.PRODUCTS, data);
    return response.data;
  },
};
