import { NextRequest, NextResponse } from "next/server";
import { categoryService } from "@/server/services/category.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
