# 🔧 Sistema de Gestión Ferretería Alvear

Sistema integral de gestión para ferretería que digitaliza y automatiza los procesos de control de stock, ventas y facturación.

## 📋 Descripción del Proyecto

Este sistema fue desarrollado para resolver el problema crítico de gestión manual en papel que generaba inconsistencias en los precios ofrecidos por diferentes empleados. La solución informatiza completamente el negocio, garantizando precios uniformes y control preciso del inventario.

### Problema Identificado
- ❌ Registro manual en papel de productos y precios
- ❌ Inconsistencia en precios entre empleados
- ❌ Falta de control de stock en tiempo real
- ❌ Proceso manual de facturación y presupuestos

### Solución Implementada
- ✅ Sistema centralizado de gestión de precios
- ✅ Control de stock automatizado
- ✅ Integración con pistola lectora de código de barras
- ✅ Generación automática de remitos, presupuestos y facturas
- ✅ Interfaz intuitiva para todos los empleados

## 🚀 Características Principales

- **Control de Stock**: Gestión en tiempo real del inventario
- **Gestión de Precios**: Base de datos centralizada de productos y precios
- **Lectura de Códigos de Barras**: Integración con pistola lectora para agilizar ventas
- **Generación de Documentos**:
  - Remitos
  - Presupuestos
  - Facturas
- **Sistema Multi-usuario**: Acceso para múltiples empleados con precios consistentes

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 16.1.6 + React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Framework**: App Router de Next.js

## 📦 Instalación

### Requisitos Previos
- Node.js 20 o superior
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd ferreteria-alvear/ferreteria-alvear
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## 🖥️ Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 📁 Estructura del Proyecto

```
ferreteria-alvear/
├── app/                 # Directorio principal de la aplicación
│   ├── page.tsx        # Página principal
│   ├── layout.tsx      # Layout global
│   └── globals.css     # Estilos globales
├── public/             # Archivos estáticos
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript
└── next.config.ts      # Configuración de Next.js
```

## 🔌 Integración con Hardware

### Pistola Lectora de Código de Barras
El sistema está preparado para recibir input de pistolas lectoras de código de barras que emulan teclado (HID). La lectura se procesa automáticamente para buscar productos en la base de datos.

## 🎯 Casos de Uso

1. **Venta Rápida**: Escanear productos con pistola lectora y generar factura
2. **Consulta de Precios**: Búsqueda instantánea de precios actualizados
3. **Control de Inventario**: Visualización y actualización de stock
4. **Generación de Presupuestos**: Crear presupuestos para clientes
5. **Emisión de Remitos**: Documentar entregas de mercadería

## 🔐 Seguridad

- Validación de datos en frontend y backend
- Control de acceso por usuario
- Registro de operaciones para auditoría

## 📈 Beneficios del Sistema

- **Consistencia**: Todos los empleados acceden a los mismos precios
- **Eficiencia**: Reducción del tiempo de atención al cliente
- **Precisión**: Eliminación de errores de transcripción manual
- **Trazabilidad**: Registro completo de todas las operaciones
- **Profesionalismo**: Documentación impresa de calidad

## 🤝 Contribución

Este es un proyecto privado para Ferretería Alvear. Para sugerencias o reportes de errores, contactar al administrador del sistema.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados © Ferretería Alvear

## 📞 Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de desarrollo.

---

**Versión**: 0.1.0  
**Última actualización**: 2024
