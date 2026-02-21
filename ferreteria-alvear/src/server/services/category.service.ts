import { categoryRepository } from "@/server/repository/category.repository";

export const categoryService = {
  async getAllCategories() {
    return categoryRepository.findAll();
  },
};
