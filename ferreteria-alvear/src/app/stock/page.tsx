"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/common/DataTable";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSignIcon, PackageIcon, DollarCircleIcon, Alert02Icon, PrinterIcon } from "hugeicons-react";
import { productClientService } from "@/services/product.service";
import { supplierClientService } from "@/services/supplier.service";
import { clientErrorHandler } from "@/utils/handlers/clientError.handler";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { IProductWithSupplier, IProductFormValues } from "@/types/product.types";
import { ISupplier } from "@/types/supplier.types";
import { ICategory } from "@/types/category.types";
import { categoryClientService } from "@/services/category.service";
import { BarcodeInput } from "@/components/common/BarcodeInput";
import { TableActions } from "@/components/common/TableActions";
import { generateBarcodeCatalogPDF } from "@/utils/pdf/barcodeCatalog.util";

export default function StockPage() {
  const [products, setProducts] = useState<IProductWithSupplier[]>([]);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalValue: 0, criticalStock: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "view" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<IProductWithSupplier | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const [formData, setFormData] = useState<IProductFormValues>({
    name: "",
    description: null,
    barcode: "",
    stockActual: 0,
    stockMinimo: 5,
    cost: 0,
    profitMargin: 30,
    price: 0,
    supplierId: "",
    categoryId: "",
  });

  const [supplierFormData, setSupplierFormData] = useState({
    name: "",
    contact: "",
  });

  useEffect(() => {
    loadSuppliers();
    loadCategories();
    loadStats();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [debouncedSearch]);

  useEffect(() => {
    const cost = formData.cost;
    const margin = formData.profitMargin;
    if (cost > 0 && margin >= 0) {
      const price = cost * (1 + margin / 100);
      setFormData((prev) => ({ ...prev, price: Number(price.toFixed(2)) }));
    }
  }, [formData.cost, formData.profitMargin]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productClientService.getAll(debouncedSearch || undefined);
      setProducts(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const loadSuppliers = async () => {
    try {
      const data = await supplierClientService.getAll();
      setSuppliers(data);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryClientService.getAll();
      setCategories(data);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await productClientService.getStats();
      setStats(data);
    } catch (error) {
      clientErrorHandler(error);
    }
  };

  const handleSubmitSupplier = async () => {
    try {
      setSubmitting(true);
      const newSupplier = await supplierClientService.create({
        name: supplierFormData.name,
        contact: supplierFormData.contact || null,
      });
      toast.success("Proveedor creado exitosamente");
      setIsSupplierModalOpen(false);
      setSupplierFormData({ name: "", contact: "" });
      await loadSuppliers();
      setFormData({ ...formData, supplierId: newSupplier.id });
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await productClientService.create(formData);
      toast.success("Producto creado exitosamente");
      setIsModalOpen(false);
      resetForm();
      loadProducts();
      loadStats();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenModal = (mode: "create" | "view" | "edit", product?: IProductWithSupplier) => {
    setModalMode(mode);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        barcode: product.barcode,
        stockActual: product.stockActual,
        stockMinimo: product.stockMinimo,
        cost: Number(product.cost),
        profitMargin: Number(product.profitMargin),
        price: Number(product.price),
        supplierId: product.supplierId,
        categoryId: product.categoryId,
      });
    } else {
      setSelectedProduct(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: null,
      barcode: "",
      stockActual: 0,
      stockMinimo: 5,
      cost: 0,
      profitMargin: 30,
      price: 0,
      supplierId: "",
      categoryId: "",
    });
  };

  const handleGeneratePDF = async () => {
    try {
      setGeneratingPDF(true);
      await generateBarcodeCatalogPDF();
      toast.success("PDF generado exitosamente");
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Total Productos</p>
                  <h3 className="text-3xl font-bold text-text">{stats.totalProducts}</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <PackageIcon size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Valor de Inventario</p>
                  <h3 className="text-3xl font-bold text-text">${stats.totalValue.toFixed(0)}</h3>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <DollarCircleIcon size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Stock Crítico</p>
                  <h3 className="text-3xl font-bold text-text">{stats.criticalStock}</h3>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
                  <Alert02Icon size={24} className="text-error" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable<IProductWithSupplier>
          title="Inventario de Productos"
          columns={[
            {
              key: "name",
              label: "PRODUCTO",
              className: "w-1/6 text-center",
              render: (item) => (
                <div className="text-center">
                  <p className="font-medium text-text">{item.name}</p>
                  <p className="text-xs text-text-secondary">{item.description}</p>
                </div>
              ),
            },
            {
              key: "barcode",
              label: "SKU",
              className: "w-1/6 text-center",
              render: (item) => <span className="text-text-secondary">{item.barcode}</span>,
            },
            {
              key: "category",
              label: "CATEGORÍA",
              className: "w-1/6 text-center",
              render: (item) => <span className="text-text-secondary">{item.category.name}</span>,
            },
            {
              key: "supplier",
              label: "PROVEEDOR",
              className: "w-1/6 text-center",
              render: (item) => <span className="text-text-secondary">{item.supplier.name}</span>,
            },
            {
              key: "stock",
              label: "STOCK",
              className: "w-1/6 text-center",
              render: (item) => (
                <span className={`font-semibold ${item.stockActual <= item.stockMinimo ? "text-error" : "text-text"}`}>{item.stockActual} unid.</span>
              ),
            },
            {
              key: "price",
              label: "PRECIO",
              className: "w-1/6 text-center",
              render: (item) => <span className="text-text font-semibold">${Number(item.price).toFixed(2)}</span>,
            },
            {
              key: "actions",
              label: "ACCIONES",
              className: "w-1/6 text-center",
              render: (item) => (
                <div className="flex justify-center">
                  <TableActions
                    actions={[
                      {
                        label: "Ver",
                        icon: "view",
                        onClick: () => handleOpenModal("view", item),
                      },
                      {
                        label: "Editar",
                        icon: "edit",
                        onClick: () => handleOpenModal("edit", item),
                      },
                      {
                        label: "Eliminar",
                        icon: "delete",
                        variant: "destructive",
                        onClick: () => console.log("Eliminar", item.id),
                      },
                    ]}
                  />
                </div>
              ),
            },
          ]}
          data={products}
          keyExtractor={(item) => item.id}
          emptyMessage="No hay productos registrados"
          loading={loading}
          searchPlaceholder="Buscar por nombre o SKU..."
          onSearch={setSearchTerm}
          actions={
            <>
              <Button
                onClick={handleGeneratePDF}
                disabled={generatingPDF || products.length === 0}
                variant="outline"
                className="gap-2"
              >
                <PrinterIcon size={18} />
                {generatingPDF ? "Generando..." : "Imprimir Etiquetas"}
              </Button>
              <Button onClick={() => handleOpenModal("create")} className="gap-2 text-white">
                <PlusSignIcon size={18} />
                Agregar Producto
              </Button>
            </>
          }
        />
      </div>

      <GenericModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={
          modalMode === "create"
            ? "Nueva Carga de Producto"
            : modalMode === "view"
            ? "Detalle del Producto"
            : "Editar Producto"
        }
        description={
          modalMode === "create"
            ? "Complete los datos para agregar un nuevo ítem al inventario"
            : modalMode === "view"
            ? "Información del producto"
            : "Modifique los datos del producto"
        }
        size="lg"
        footer={
          modalMode !== "view" ? (
            <>
              <Button variant="cancel" onClick={() => setIsModalOpen(false)} disabled={submitting}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Guardando..." : "Guardar Producto"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
          )
        }
      >
        <div className="space-y-4">
          <div>
            <Label>Nombre del Producto</Label>
            <Input
              placeholder="Ej: Taladro Percutor 600W"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={modalMode === "view"}
            />
          </div>

          <div>
            <Label>Descripción (Opcional)</Label>
            <Input
              placeholder="Descripción del producto"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value || null })}
              disabled={modalMode === "view"}
            />
          </div>

          <BarcodeInput
            value={formData.barcode}
            onChange={(barcode) => setFormData({ ...formData, barcode })}
            disabled={submitting || modalMode === "view"}
          />

          <div>
            <Label>Categoría</Label>
            <select
              className="w-full h-10 px-3 rounded-md border border-border bg-background text-text"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              disabled={modalMode === "view"}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label>Proveedor</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-border bg-background text-text"
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                disabled={modalMode === "view"}
              >
                <option value="">Seleccionar proveedor</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            {modalMode !== "view" && (
              <div className="flex items-end">
                <Button type="button" variant="outline" size="icon" onClick={() => setIsSupplierModalOpen(true)} title="Agregar proveedor">
                  <PlusSignIcon size={18} />
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Stock Inicial</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stockActual || ""}
                onChange={(e) => setFormData({ ...formData, stockActual: e.target.value ? Number(e.target.value) : 0 })}
                disabled={modalMode === "view"}
              />
            </div>

            <div>
              <Label>Punto de Pedido</Label>
              <Input
                type="number"
                placeholder="5"
                value={formData.stockMinimo || ""}
                onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value ? Number(e.target.value) : 0 })}
                disabled={modalMode === "view"}
              />
            </div>
          </div>

          <p className="text-xs text-text-tertiary">El punto de pedido genera alertas cuando el stock llega a ese nivel</p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Precio Costo</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="$ 0.00"
                value={formData.cost || ""}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value ? Number(e.target.value) : 0 })}
                disabled={modalMode === "view"}
              />
            </div>

            <div>
              <Label>Margen (%)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="30"
                value={formData.profitMargin || ""}
                onChange={(e) => setFormData({ ...formData, profitMargin: e.target.value ? Number(e.target.value) : 0 })}
                disabled={modalMode === "view"}
              />
            </div>

            <div>
              <Label>Precio Venta</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="$ 0.00"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : 0 })}
                disabled={modalMode === "view"}
              />
            </div>
          </div>
        </div>
      </GenericModal>

      <GenericModal
        open={isSupplierModalOpen}
        onOpenChange={setIsSupplierModalOpen}
        title="Nuevo Proveedor"
        description="Agregar un nuevo proveedor al sistema"
        footer={
          <>
            <Button variant="cancel" onClick={() => setIsSupplierModalOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSubmitSupplier} disabled={submitting}>
              {submitting ? "Guardando..." : "Guardar Proveedor"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label>Nombre del Proveedor</Label>
            <Input
              placeholder="Ej: Distribuidora ABC"
              value={supplierFormData.name}
              onChange={(e) => setSupplierFormData({ ...supplierFormData, name: e.target.value })}
            />
          </div>

          <div>
            <Label>Contacto (Opcional)</Label>
            <Input
              placeholder="Teléfono, email o persona de contacto"
              value={supplierFormData.contact}
              onChange={(e) => setSupplierFormData({ ...supplierFormData, contact: e.target.value })}
            />
          </div>
        </div>
      </GenericModal>
    </DashboardLayout>
  );
}
