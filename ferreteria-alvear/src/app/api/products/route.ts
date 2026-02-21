import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/server/services/product.service";
import { createProductSchema } from "@/schemas/product.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import bwipjs from "bwip-js";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const stats = searchParams.get("stats");
    const catalog = searchParams.get("catalog");

    if (stats) {
      const productStats = await productService.getProductStats();
      return NextResponse.json(productStats, { status: httpStatus.OK });
    }

    if (catalog) {
      const products = await productService.getAllProducts();
      
      const barcodes = await Promise.all(
        products.map(async (product) => {
          const png = await bwipjs.toBuffer({
            bcid: "code128",
            text: product.barcode,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: "center",
          });

          return {
            id: product.id,
            name: product.name,
            barcode: product.barcode,
            image: `data:image/png;base64,${png.toString("base64")}`,
          };
        })
      );

      return NextResponse.json(barcodes, { status: httpStatus.OK });
    }

    const products = await productService.getAllProducts(search);
    return NextResponse.json(products, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    const product = await productService.createProduct({
      ...validatedData,
      description: validatedData.description || null,
    });
    return NextResponse.json(product, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
