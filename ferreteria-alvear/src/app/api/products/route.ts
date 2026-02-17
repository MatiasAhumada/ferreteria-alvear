import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/server/services/product.service";
import { createProductSchema } from "@/schemas/product.schema";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;

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
