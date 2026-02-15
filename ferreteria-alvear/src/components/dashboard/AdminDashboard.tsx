"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarCircleIcon,
  UserMultiple02Icon,
  Tired01Icon,
  Download01Icon,
  PlusSignIcon,
  PackageIcon,
  UserAdd01Icon,
  DollarSquareIcon,
  ArrowRight01Icon,
  Alert02Icon,
} from "hugeicons-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Resumen Diario</h1>
          <p className="text-text-secondary mt-1">Martes, 24 de Octubre 2023</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download01Icon size={18} />
            Exportar
          </Button>
          <Button className="gap-2 bg-gradient-to-r text-white from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover">
            <PlusSignIcon size={18} />
            Nueva Venta
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-2">Ventas del Día</p>
                <h3 className="text-3xl font-bold text-text">$154,320</h3>
                <p className="text-success text-sm mt-2 flex items-center gap-1">
                  <Tired01Icon size={16} />
                  +12.5%
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarCircleIcon size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-2">Clientes Atendidos</p>
                <h3 className="text-3xl font-bold text-text">42</h3>
                <p className="text-text-tertiary text-sm mt-2">Promedio 8/hora</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <UserMultiple02Icon size={24} className="text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-2">Ganancia Estimada</p>
                <h3 className="text-3xl font-bold text-text">$32,500</h3>
                <p className="text-success text-sm mt-2 flex items-center gap-1">
                  <Tired01Icon size={16} />
                  +5.2%
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Tired01Icon size={24} className="text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 border-0 shadow-lg">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Alert02Icon size={20} className="text-error" />
                </div>
                <div>
                  <CardTitle className="text-lg">Alertas de Stock Bajo</CardTitle>
                  <p className="text-sm text-text-secondary">Productos que necesitan reposición urgente.</p>
                </div>
              </div>
              <Button variant="link" className="text-primary">
                Ver Stock →
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-background-secondary/50">
                <tr className="text-left text-sm text-text-secondary">
                  <th className="p-4 font-medium">PRODUCTO</th>
                  <th className="p-4 font-medium">CATEGORÍA</th>
                  <th className="p-4 font-medium">STOCK ACTUAL</th>
                  <th className="p-4 font-medium">ESTADO</th>
                  <th className="p-4 font-medium">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'Tornillos Phillips 2"', category: "Fijaciones", stock: "50 unid.", status: "Crítico" },
                  { name: "Pintura Blanca Latex 20L", category: "Pinturería", stock: "2 unid.", status: "Crítico" },
                  { name: "Martillo Carpintero", category: "Herramientas", stock: "4 unid.", status: "Bajo" },
                  { name: "Lámpara LED 9W", category: "Electricidad", stock: "12 unid.", status: "Bajo" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-background-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <PackageIcon size={20} className="text-primary" />
                        </div>
                        <span className="font-medium text-text">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary">{item.category}</td>
                    <td className="p-4 text-error font-semibold">{item.stock}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Crítico" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="link" className="text-primary p-0">
                        Reponer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {[
                { icon: PackageIcon, label: "Ingresar Stock", color: "bg-primary/10 text-primary" },
                { icon: UserAdd01Icon, label: "Nuevo Cliente", color: "bg-secondary/10 text-secondary" },
                { icon: DollarSquareIcon, label: "Cierre de Caja", color: "bg-accent/10 text-accent" },
              ].map((action, i) => (
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
        </div>
      </div>
    </div>
  );
}
