export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PRODUCTS: "/products",
  SALES: "/sales",
  INVENTORY: "/inventory",
  CUSTOMERS: "/customers",
  REPORTS: "/reports",
} as const;

export const ROUTE_LABELS: Record<string, string> = {
  "": "Inicio",
  login: "Iniciar Sesión",
  products: "Productos",
  sales: "Ventas",
  inventory: "Stock",
  customers: "Clientes",
  reports: "Reportes",
} as const;

export const API_ROUTES = {
  AUTH: {
    SESSION: "/api/session",
    REGISTER: "/api/users",
  },
  PRODUCTS: "/api/products",
  SALES: "/api/sales",
  INVENTORY: "/api/inventory",
  CUSTOMERS: "/api/customers",
  REPORTS: "/api/reports",
} as const;
