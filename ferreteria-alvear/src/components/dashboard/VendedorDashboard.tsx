"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarCircleIcon,
  UserMultiple02Icon,
  PlusSignIcon,
  ShoppingCart01Icon,
  UserAdd01Icon,
  DollarSquareIcon,
  ArrowRight01Icon,
  PackageIcon,
} from "hugeicons-react";

export function VendedorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text">Mi Turno</h1>
          <p className="text-text-secondary mt-1">Martes, 24 de Octubre 2023</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r text-white from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover">
          <PlusSignIcon size={18} />
          <span className="hidden sm:inline">Nueva Venta</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-2">Mis Ventas del Día</p>
                <h3 className="text-3xl font-bold text-text">$45,200</h3>
                <p className="text-text-tertiary text-sm mt-2">8 ventas realizadas</p>
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
                <h3 className="text-3xl font-bold text-text">12</h3>
                <p className="text-text-tertiary text-sm mt-2">Promedio 3/hora</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <UserMultiple02Icon size={24} className="text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base lg:text-lg">Últimas Ventas</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-background-secondary/50">
                <tr className="text-left text-sm text-text-secondary">
                  <th className="p-4 font-medium">CLIENTE</th>
                  <th className="p-4 font-medium">PRODUCTOS</th>
                  <th className="p-4 font-medium">TOTAL</th>
                  <th className="p-4 font-medium">HORA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { client: "Juan Pérez", products: "3 items", total: "$12,500", time: "14:30" },
                  { client: "María González", products: "5 items", total: "$8,200", time: "13:45" },
                  { client: "Carlos Ruiz", products: "2 items", total: "$15,800", time: "12:20" },
                  { client: "Ana Martínez", products: "4 items", total: "$9,700", time: "11:15" },
                ].map((sale, i) => (
                  <tr key={i} className="hover:bg-background-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-secondary">{sale.client.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-text">{sale.client}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary">{sale.products}</td>
                    <td className="p-4 text-text font-semibold">{sale.total}</td>
                    <td className="p-4 text-text-tertiary">{sale.time}</td>
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
                { icon: ShoppingCart01Icon, label: "Nueva Venta", color: "bg-primary/10 text-primary" },
                { icon: UserAdd01Icon, label: "Nuevo Cliente", color: "bg-secondary/10 text-secondary" },
                { icon: PackageIcon, label: "Consultar Stock", color: "bg-accent/10 text-accent" },
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
        </div>
      </div>
    </div>
  );
}
