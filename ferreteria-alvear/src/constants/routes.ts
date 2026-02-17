export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  STOCK: "/stock",
  SALES: "/sales",
  CUSTOMERS: "/customers",
  SUPPLIERS: "/suppliers",
  BOX: "/box",
  REPORTS: "/reports",
  USERS: "/users",
} as const;

export const ROUTE_LABELS: Record<string, string> = {
  "": "Inicio",
  login: "Iniciar Sesión",
  stock: "Stock",
  sales: "Ventas",
  customers: "Clientes",
  suppliers: "Proveedores",
  box: "Caja",
  reports: "Reportes",
  users: "Usuarios",
} as const;

export const API_ROUTES = {
  AUTH: {
    SESSION: "/api/session",
    REGISTER: "/api/users",
  },
  PRODUCTS: "/api/products",
  SUPPLIERS: "/api/suppliers",
  SALES: "/api/sales",
  CUSTOMERS: "/api/customers",
  REPORTS: "/api/reports",
} as const;
