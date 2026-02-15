# Configuración de Colores

## Variables de Entorno

El sistema utiliza variables de entorno para personalizar la paleta de colores. Esto permite adaptar la aplicación para diferentes clientes sin modificar código.

### Configuración Inicial

1. Copiar `.env.example` a `.env.local`
2. Configurar los colores según la paleta del cliente

### Variables Disponibles

#### Colores Principales
- `NEXT_PUBLIC_COLOR_PRIMARY` - Color principal de marca
- `NEXT_PUBLIC_COLOR_PRIMARY_HOVER` - Hover del color principal
- `NEXT_PUBLIC_COLOR_PRIMARY_LIGHT` - Variante clara
- `NEXT_PUBLIC_COLOR_PRIMARY_DARK` - Variante oscura

#### Colores Secundarios
- `NEXT_PUBLIC_COLOR_SECONDARY` - Color secundario
- `NEXT_PUBLIC_COLOR_SECONDARY_HOVER` - Hover del secundario
- `NEXT_PUBLIC_COLOR_SECONDARY_LIGHT` - Variante clara
- `NEXT_PUBLIC_COLOR_SECONDARY_DARK` - Variante oscura

#### Colores de Acento
- `NEXT_PUBLIC_COLOR_ACCENT` - Color de acento
- `NEXT_PUBLIC_COLOR_ACCENT_HOVER` - Hover del acento
- `NEXT_PUBLIC_COLOR_ACCENT_LIGHT` - Variante clara
- `NEXT_PUBLIC_COLOR_ACCENT_DARK` - Variante oscura

#### Fondos
- `NEXT_PUBLIC_COLOR_BACKGROUND` - Fondo principal
- `NEXT_PUBLIC_COLOR_BACKGROUND_SECONDARY` - Fondo secundario
- `NEXT_PUBLIC_COLOR_BACKGROUND_TERTIARY` - Fondo terciario

#### Superficies
- `NEXT_PUBLIC_COLOR_SURFACE` - Superficie (cards, modales)
- `NEXT_PUBLIC_COLOR_SURFACE_HOVER` - Hover de superficie
- `NEXT_PUBLIC_COLOR_SURFACE_ACTIVE` - Superficie activa

#### Textos
- `NEXT_PUBLIC_COLOR_TEXT` - Texto principal
- `NEXT_PUBLIC_COLOR_TEXT_SECONDARY` - Texto secundario
- `NEXT_PUBLIC_COLOR_TEXT_TERTIARY` - Texto terciario
- `NEXT_PUBLIC_COLOR_TEXT_INVERSE` - Texto inverso (sobre fondos oscuros)

#### Bordes
- `NEXT_PUBLIC_COLOR_BORDER` - Borde normal
- `NEXT_PUBLIC_COLOR_BORDER_HOVER` - Borde en hover
- `NEXT_PUBLIC_COLOR_BORDER_FOCUS` - Borde en focus

#### Estados
- `NEXT_PUBLIC_COLOR_SUCCESS` - Éxito
- `NEXT_PUBLIC_COLOR_SUCCESS_LIGHT` - Éxito claro
- `NEXT_PUBLIC_COLOR_SUCCESS_DARK` - Éxito oscuro
- `NEXT_PUBLIC_COLOR_ERROR` - Error
- `NEXT_PUBLIC_COLOR_ERROR_LIGHT` - Error claro
- `NEXT_PUBLIC_COLOR_ERROR_DARK` - Error oscuro
- `NEXT_PUBLIC_COLOR_WARNING` - Advertencia
- `NEXT_PUBLIC_COLOR_WARNING_LIGHT` - Advertencia clara
- `NEXT_PUBLIC_COLOR_WARNING_DARK` - Advertencia oscura
- `NEXT_PUBLIC_COLOR_INFO` - Información
- `NEXT_PUBLIC_COLOR_INFO_LIGHT` - Información clara
- `NEXT_PUBLIC_COLOR_INFO_DARK` - Información oscura

### Uso en Componentes

```tsx
<button className="bg-primary hover:bg-primary-hover text-text-inverse">
  Botón Principal
</button>

<div className="bg-surface border border-border hover:border-border-hover">
  Card
</div>

<p className="text-text-secondary">Texto secundario</p>
```

### Cambiar Paleta para Nuevo Cliente

1. Modificar valores en `.env.local`
2. Reiniciar servidor de desarrollo
3. Los colores se actualizan automáticamente en toda la aplicación
