# Guía de Deploy - Ferretería Alvear

## 1. Configurar Secrets en GitHub

Ve a tu repositorio → Settings → Secrets and variables → Actions → New repository secret

Agrega estos secrets:
- `VPS_HOST`: IP de tu VPS
- `VPS_USER`: root
- `VPS_PASSWORD`: tu contraseña

## 2. Comandos en el VPS

### Clonar el repositorio (primera vez)
```bash
cd ~
git clone https://github.com/tu-usuario/ferreteria-alvear.git
cd ferreteria-alvear/ferreteria-alvear
```

### Configurar variables de entorno
```bash
cp .env.example .env
nano .env
# Configurar todas las variables necesarias
```

### Instalar dependencias
```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### Configurar base de datos
```bash
# Crear base de datos en PostgreSQL
sudo -u postgres psql
CREATE DATABASE ferreteria_alvear;
\q

# Ejecutar migraciones
pnpm migrate

# Ejecutar seed (usuario admin)
pnpm seed
```

### Build y start inicial
```bash
pnpm build
pm2 start "pnpm start" --name ferreteria-alvear
pm2 save
pm2 startup
```

## 3. Configurar Nginx

### Copiar configuración
```bash
sudo cp nginx.conf /etc/nginx/sites-available/ferreteria-alvear
sudo ln -s /etc/nginx/sites-available/ferreteria-alvear /etc/nginx/sites-enabled/
```

### Editar con tu dominio
```bash
sudo nano /etc/nginx/sites-available/ferreteria-alvear
# Cambiar "tu-dominio.com" por tu dominio real
```

### Probar y reiniciar nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 4. Configurar SSL (cuando tengas dominio)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 5. Acceso temporal por IP

Mientras no tengas dominio, accede por:
```
http://TU_IP:3002
```

O configura nginx para escuchar en puerto 80 sin dominio:
```bash
sudo nano /etc/nginx/sites-available/ferreteria-alvear
# Cambiar "server_name" a: server_name _;
sudo systemctl restart nginx
```

Luego accede por: `http://TU_IP`

## 6. Comandos útiles PM2

```bash
pm2 list                          # Ver procesos
pm2 logs ferreteria-alvear        # Ver logs
pm2 restart ferreteria-alvear     # Reiniciar
pm2 stop ferreteria-alvear        # Detener
pm2 delete ferreteria-alvear      # Eliminar proceso
```

## 7. Deploy automático

Cada push a `main` ejecutará el workflow automáticamente.
