import { Role } from "@prisma/client";
import {
  DollarCircleIcon,
  UserMultiple02Icon,
  Tired01Icon,
  Download01Icon,
  PlusSignIcon,
  PackageIcon,
  UserAdd01Icon,
  DollarSquareIcon,
  ShoppingCart01Icon,
} from "hugeicons-react";

interface MetricConfig {
  label: string;
  icon: typeof DollarCircleIcon;
  iconColor: string;
  showTrend?: boolean;
}

interface ActionConfig {
  icon: typeof PackageIcon;
  label: string;
  color: string;
}

interface DashboardConfig {
  title: string;
  metrics: MetricConfig[];
  actions: ActionConfig[];
  showExportButton: boolean;
  showStockAlerts: boolean;
  showSalesTable: boolean;
  showGoalCard: boolean;
  showCashCard: boolean;
}

export const DASHBOARD_CONFIG: Record<Role, DashboardConfig> = {
  [Role.ADMIN]: {
    title: "Resumen Diario",
    metrics: [
      {
        label: "Ventas del Día",
        icon: DollarCircleIcon,
        iconColor: "bg-primary/10 text-primary",
        showTrend: true,
      },
      {
        label: "Clientes Atendidos",
        icon: UserMultiple02Icon,
        iconColor: "bg-secondary/10 text-secondary",
      },
      {
        label: "Ganancia Estimada",
        icon: Tired01Icon,
        iconColor: "bg-accent/10 text-accent",
        showTrend: true,
      },
    ],
    actions: [
      { icon: PackageIcon, label: "Ingresar Stock", color: "bg-primary/10 text-primary" },
      { icon: UserAdd01Icon, label: "Nuevo Cliente", color: "bg-secondary/10 text-secondary" },
      { icon: DollarSquareIcon, label: "Cierre de Caja", color: "bg-accent/10 text-accent" },
    ],
    showExportButton: true,
    showStockAlerts: true,
    showSalesTable: false,
    showGoalCard: true,
    showCashCard: false,
  },
  [Role.VENDEDOR]: {
    title: "Mi Turno",
    metrics: [
      {
        label: "Mis Ventas del Día",
        icon: DollarCircleIcon,
        iconColor: "bg-primary/10 text-primary",
      },
      {
        label: "Clientes Atendidos",
        icon: UserMultiple02Icon,
        iconColor: "bg-secondary/10 text-secondary",
      },
    ],
    actions: [
      { icon: ShoppingCart01Icon, label: "Nueva Venta", color: "bg-primary/10 text-primary" },
      { icon: UserAdd01Icon, label: "Nuevo Cliente", color: "bg-secondary/10 text-secondary" },
      { icon: PackageIcon, label: "Consultar Stock", color: "bg-accent/10 text-accent" },
    ],
    showExportButton: false,
    showStockAlerts: false,
    showSalesTable: true,
    showGoalCard: false,
    showCashCard: true,
  },
};

export const HEADER_ACTIONS = {
  export: { icon: Download01Icon, label: "Exportar" },
  newSale: { icon: PlusSignIcon, label: "Nueva Venta" },
};
