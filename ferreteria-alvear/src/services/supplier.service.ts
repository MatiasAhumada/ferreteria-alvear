import { clientAxios } from "@/utils/clientAxios.util";

export const supplierClientService = {
  async getAll() {
    const response = await clientAxios.get("/suppliers");
    return response.data;
  },
};
