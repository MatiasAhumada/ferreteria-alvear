"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/common/DataTable";
import { GenericModal } from "@/components/common/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSignIcon, TruckDeliveryIcon } from "hugeicons-react";
import { supplierClientService } from "@/services/supplier.service";
import { clientErrorHandler, clientSuccessHandler } from "@/utils/handlers/clientError.handler";
import { SUCCESS_MESSAGES } from "@/constants/success-messages.constant";
import { useDebounce } from "@/hooks/useDebounce";
import { ISupplier } from "@/types/supplier.types";
import { formatDate } from "@/utils/formatters/date.formatter";

interface SupplierFormData {
  name: string;
  contact: string;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    contact: "",
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await supplierClientService.getAll();
      setSuppliers(data);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await supplierClientService.create({
        name: formData.name,
        contact: formData.contact || null,
      });
      clientSuccessHandler(SUCCESS_MESSAGES.SUPPLIER_CREATED);
      setIsModalOpen(false);
      resetForm();
      loadSuppliers();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contact: "",
    });
  };

  const filteredSuppliers = suppliers.filter((supplier) => supplier.name.toLowerCase().includes(debouncedSearch.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Total Proveedores</p>
                  <h3 className="text-3xl font-bold text-text">{suppliers.length}</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TruckDeliveryIcon size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Proveedores Activos</p>
                  <h3 className="text-3xl font-bold text-text">{suppliers.length}</h3>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <TruckDeliveryIcon size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable<ISupplier>
          title="Gestión de Proveedores"
          columns={[
            {
              key: "name",
              label: "PROVEEDOR",
              render: (item) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TruckDeliveryIcon size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-text">{item.name}</span>
                </div>
              ),
            },
            {
              key: "contact",
              label: "CONTACTO",
              render: (item) => <span className="text-text-secondary">{item.contact || "Sin contacto"}</span>,
            },
            {
              key: "createdAt",
              label: "FECHA DE REGISTRO",
              render: (item) => <span className="text-text-secondary">{formatDate(item.createdAt)}</span>,
            },
          ]}
          data={filteredSuppliers}
          keyExtractor={(item) => item.id}
          emptyMessage="No hay proveedores registrados"
          loading={loading}
          searchPlaceholder="Buscar proveedor..."
          onSearch={setSearchTerm}
          actions={
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 text-white">
              <PlusSignIcon size={18} />
              Agregar Proveedor
            </Button>
          }
        />
      </div>

      <GenericModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Nuevo Proveedor"
        description="Agregar un nuevo proveedor al sistema"
        footer={
          <>
            <Button variant="cancel" onClick={() => setIsModalOpen(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Guardando..." : "Guardar Proveedor"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label>Nombre del Proveedor</Label>
            <Input placeholder="Ej: Distribuidora ABC" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div>
            <Label>Contacto (Opcional)</Label>
            <Input
              placeholder="Teléfono, email o persona de contacto"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
        </div>
      </GenericModal>
    </DashboardLayout>
  );
}
