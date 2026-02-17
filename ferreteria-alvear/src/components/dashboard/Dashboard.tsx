"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { DASHBOARD_CONFIG, HEADER_ACTIONS } from "@/config/dashboard.config";
import { Role } from "@prisma/client";
import { Tired01Icon, ArrowRight01Icon, PackageIcon, DollarSquareIcon } from "hugeicons-react";

interface StockAlert {
  id: string;
  name: string;
  category: string;
  stock: string;
  status: "Crítico" | "Bajo";
}

interface Sale {
  id: string;
  client: string;
  products: string;
  total: string;
  time: string;
}

interface DashboardProps {
  role: Role;
}

export function Dashboard({ role }: DashboardProps) {
  const config = DASHBOARD_CONFIG[role];

  const mockMetrics: Record<Role, Array<{ value: string; trend?: string; subtitle?: string }>> = {
    [Role.ADMIN]: [
      { value: "$154,320", trend: "+12.5%" },
      { value: "42", subtitle: "Promedio 8/hora" },
      { value: "$32,500", trend: "+5.2%" },
    ],
    [Role.VENDEDOR]: [
      { value: "$45,200", subtitle: "8 ventas realizadas" },
      { value: "12", subtitle: "Promedio 3/hora" },
    ],
  };

  const stockAlerts: StockAlert[] = [
    { id: "1", name: 'Tornillos Phillips 2"', category: "Fijaciones", stock: "50 unid.", status: "Crítico" },
    { id: "2", name: "Pintura Blanca Latex 20L", category: "Pinturería", stock: "2 unid.", status: "Crítico" },
    { id: "3", name: "Martillo Carpintero", category: "Herramientas", stock: "4 unid.", status: "Bajo" },
    { id: "4", name: "Lámpara LED 9W", category: "Electricidad", stock: "12 unid.", status: "Bajo" },
  ];

  const sales: Sale[] = [
    { id: "1", client: "Juan Pérez", products: "3 items", total: "$12,500", time: "14:30" },
    { id: "2", client: "María González", products: "5 items", total: "$8,200", time: "13:45" },
    { id: "3", client: "Carlos Ruiz", products: "2 items", total: "$15,800", time: "12:20" },
    { id: "4", client: "Ana Martínez", products: "4 items", total: "$9,700", time: "11:15" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text">{config.title}</h1>
          <p className="text-text-secondary mt-1">Martes, 24 de Octubre 2023</p>
        </div>
        <div className="flex gap-3">
          {config.showExportButton && (
            <Button variant="outline" className="gap-2">
              <HEADER_ACTIONS.export.icon size={18} />
              <span className="hidden sm:inline">{HEADER_ACTIONS.export.label}</span>
            </Button>
          )}
          <Button className="gap-2 bg-gradient-to-r text-white from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover">
            <HEADER_ACTIONS.newSale.icon size={18} />
            <span className="hidden sm:inline">{HEADER_ACTIONS.newSale.label}</span>
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${config.metrics.length === 3 ? "lg:grid-cols-3" : ""} gap-4 lg:gap-6`}>
        {config.metrics.map((metric, index) => {
          const data = mockMetrics[role][index];
          return (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-2">{metric.label}</p>
                    <h3 className="text-3xl font-bold text-text">{data.value}</h3>
                    {metric.showTrend && data.trend && (
                      <p className="text-success text-sm mt-2 flex items-center gap-1">
                        <Tired01Icon size={16} />
                        {data.trend}
                      </p>
                    )}
                    {data.subtitle && <p className="text-text-tertiary text-sm mt-2">{data.subtitle}</p>}
                  </div>
                  <div className={`w-12 h-12 ${metric.iconColor} rounded-xl flex items-center justify-center`}>
                    <metric.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          {config.showStockAlerts && (
            <DataTable<StockAlert>
              title="Alertas de Stock Bajo"
              subtitle="Productos que necesitan reposición urgente"
              columns={[
                {
                  key: "product",
                  label: "PRODUCTO",
                  render: (item) => (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <PackageIcon size={20} className="text-primary" />
                      </div>
                      <span className="font-medium text-text">{item.name}</span>
                    </div>
                  ),
                },
                {
                  key: "category",
                  label: "CATEGORÍA",
                  render: (item) => <span className="text-text-secondary">{item.category}</span>,
                },
                {
                  key: "stock",
                  label: "STOCK ACTUAL",
                  render: (item) => <span className="text-error font-semibold">{item.stock}</span>,
                },
                {
                  key: "status",
                  label: "ESTADO",
                  render: (item) => (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Crítico" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  ),
                },
                {
                  key: "action",
                  label: "ACCIÓN",
                  render: () => (
                    <Button variant="link" className="text-primary p-0">
                      Reponer
                    </Button>
                  ),
                },
              ]}
              data={stockAlerts}
              keyExtractor={(item) => item.id}
              emptyMessage="No hay alertas de stock"
              actions={
                <Button variant="link" className="text-primary">
                  Ver Stock →
                </Button>
              }
            />
          )}

          {config.showSalesTable && (
            <DataTable<Sale>
              title="Últimas Ventas"
              columns={[
                {
                  key: "client",
                  label: "CLIENTE",
                  render: (sale) => (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-secondary">{sale.client.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-text">{sale.client}</span>
                    </div>
                  ),
                },
                {
                  key: "products",
                  label: "PRODUCTOS",
                  render: (sale) => <span className="text-text-secondary">{sale.products}</span>,
                },
                {
                  key: "total",
                  label: "TOTAL",
                  render: (sale) => <span className="text-text font-semibold">{sale.total}</span>,
                },
                {
                  key: "time",
                  label: "HORA",
                  render: (sale) => <span className="text-text-tertiary">{sale.time}</span>,
                },
              ]}
              data={sales}
              keyExtractor={(sale) => sale.id}
              emptyMessage="No hay ventas registradas"
            />
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {config.actions.map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon size={20} />
                    </div>
                    <span className="font-medium text-text">{action.label}</span>
                  </div>
                  <ArrowRight01Icon size={18} className="text-text-tertiary group-hover:text-text transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>

          {config.showGoalCard && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-secondary text-text-inverse">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Meta Mensual</h3>
                <p className="text-sm opacity-90 mb-4">Progreso de ventas de Octubre</p>
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">78%</span>
                    <span className="text-sm opacity-90 mb-1">completado</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: "78%" }}></div>
                  </div>
                  <p className="text-sm opacity-90">Faltan $45,000 para el objetivo</p>
                </div>
              </CardContent>
            </Card>
          )}

          {config.showCashCard && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary to-accent text-text-inverse">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <DollarSquareIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Caja Actual</h3>
                    <p className="text-sm opacity-90">Estado de tu turno</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm opacity-90">Efectivo:</span>
                    <span className="font-semibold">$45,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-90">Tarjeta:</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold">$45,200</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
