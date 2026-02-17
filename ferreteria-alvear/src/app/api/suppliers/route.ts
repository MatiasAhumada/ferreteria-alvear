import { NextRequest, NextResponse } from "next/server";
import { supplierService } from "@/server/services/supplier.service";
import { createSupplierSchema } from "@/schemas/supplier.schema";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createSupplierSchema.parse(body);

    const supplier = await supplierService.createSupplier({
      name: validatedData.name,
      contact: validatedData.contact || null,
    });
    return NextResponse.json(supplier, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
