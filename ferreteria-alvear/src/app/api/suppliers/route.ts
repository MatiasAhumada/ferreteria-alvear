import { NextRequest, NextResponse } from "next/server";
import { supplierService } from "@/server/services/supplier.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    return NextResponse.json(suppliers, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
