import { productRepository } from "@/server/repository/product.repository";
import { CreateProductInput, UpdateProductInput } from "@/schemas/product.schema";

export const productService = {
  async getAllProducts(search?: string) {
    return productRepository.findAll(search);
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  },

  async createProduct(data: CreateProductInput) {
    const existingProduct = await productRepository.findAll(data.barcode);
    if (existingProduct.length > 0) {
      throw new Error("Ya existe un producto con ese código de barras");
    }
    return productRepository.create(data);
  },

  async updateProduct(id: string, data: UpdateProductInput) {
    await this.getProductById(id);
    return productRepository.update(id, data);
  },

  async deleteProduct(id: string) {
    await this.getProductById(id);
    return productRepository.softDelete(id);
  },

  async getProductStats() {
    return productRepository.getStats();
  },
};
