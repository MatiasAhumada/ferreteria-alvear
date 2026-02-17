import { clientAxios } from "@/utils/clientAxios.util";
import { CreateProductInput } from "@/schemas/product.schema";

export const productClientService = {
  async getAll(search?: string) {
    const params = search ? { search } : {};
    const response = await clientAxios.get("/products", { params });
    return response.data;
  },

  async create(data: CreateProductInput) {
    const response = await clientAxios.post("/products", data);
    return response.data;
  },
};
