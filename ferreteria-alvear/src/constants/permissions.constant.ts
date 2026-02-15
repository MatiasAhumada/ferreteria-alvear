import { Role } from "@prisma/client";

export const MODULES = {
  DASHBOARD: "dashboard",
  PRODUCTS: "products",
  SALES: "sales",
  INVENTORY: "inventory",
  CUSTOMERS: "customers",
  SUPPLIERS: "suppliers",
  BOX: "box",
  REPORTS: "reports",
  USERS: "users",
  SETTINGS: "settings",
} as const;

export const MODULE_PERMISSIONS: Record<string, Role[]> = {
  [MODULES.DASHBOARD]: [Role.ADMIN, Role.VENDEDOR],
  [MODULES.PRODUCTS]: [Role.ADMIN],
  [MODULES.SALES]: [Role.ADMIN, Role.VENDEDOR],
  [MODULES.INVENTORY]: [Role.ADMIN],
  [MODULES.CUSTOMERS]: [Role.ADMIN, Role.VENDEDOR],
  [MODULES.SUPPLIERS]: [Role.ADMIN],
  [MODULES.BOX]: [Role.ADMIN, Role.VENDEDOR],
  [MODULES.REPORTS]: [Role.ADMIN],
  [MODULES.USERS]: [Role.ADMIN],
  [MODULES.SETTINGS]: [Role.ADMIN],
};

export const ROUTES_BY_ROLE = {
  [Role.ADMIN]: [
    {
      path: "/",
      label: "Dashboard",
      icon: "LayoutDashboard",
      module: MODULES.DASHBOARD,
    },
    {
      path: "/products",
      label: "Productos",
      icon: "Package",
      module: MODULES.PRODUCTS,
    },
    {
      path: "/sales",
      label: "Ventas",
      icon: "ShoppingCart",
      module: MODULES.SALES,
    },
    {
      path: "/inventory",
      label: "Inventario",
      icon: "Warehouse",
      module: MODULES.INVENTORY,
    },
    {
      path: "/customers",
      label: "Clientes",
      icon: "Users",
      module: MODULES.CUSTOMERS,
    },
    {
      path: "/suppliers",
      label: "Proveedores",
      icon: "Truck",
      module: MODULES.SUPPLIERS,
    },
    {
      path: "/box",
      label: "Caja",
      icon: "DollarSign",
      module: MODULES.BOX,
    },
    {
      path: "/reports",
      label: "Reportes",
      icon: "FileText",
      module: MODULES.REPORTS,
    },
    {
      path: "/users",
      label: "Usuarios",
      icon: "UserCog",
      module: MODULES.USERS,
    },
    {
      path: "/settings",
      label: "Configuración",
      icon: "Settings",
      module: MODULES.SETTINGS,
    },
  ],
  [Role.VENDEDOR]: [
    {
      path: "/",
      label: "Dashboard",
      icon: "LayoutDashboard",
      module: MODULES.DASHBOARD,
    },
    {
      path: "/sales",
      label: "Ventas",
      icon: "ShoppingCart",
      module: MODULES.SALES,
    },
    {
      path: "/customers",
      label: "Clientes",
      icon: "Users",
      module: MODULES.CUSTOMERS,
    },
    {
      path: "/box",
      label: "Caja",
      icon: "DollarSign",
      module: MODULES.BOX,
    },
  ],
} as const;

export function hasModuleAccess(userRole: Role, module: string): boolean {
  return MODULE_PERMISSIONS[module]?.includes(userRole) ?? false;
}
