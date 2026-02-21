import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

export const categoryClientService = {
  async getAll() {
    const response = await clientAxios.get(API_ROUTES.CATEGORIES);
    return response.data;
  },
};
