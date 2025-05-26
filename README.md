# Flujo de Aprobaciones - Frontend

Este es el frontend del sistema de flujo de aprobaciones para Fiduoccidente, desarrollado con **React**, **Vite**, **Bootstrap** y **React Router DOM**.

## Requisitos Previos

- Node.js >= 16
- NPM >= 8

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y define la URL base del backend:

```
VITE_API_BASE_URL=https://<tu-api-id>.execute-api.us-east-2.amazonaws.com/dev
```

## Scripts disponibles

### `npm run dev`

Inicia el servidor de desarrollo en [http://localhost:5173](http://localhost:5173).

### `npm run build`

Compila el proyecto para producción.

### `npm run preview`

Ejecuta una vista previa de la aplicación ya compilada.

## Estructura del Proyecto

```
src/
├── App.jsx                # Componente principal con rutas
├── main.jsx               # Punto de entrada principal
├── pages/                 # Vistas principales del sistema
│   ├── CrearSolicitud.jsx
│   ├── VerSolicitudes.jsx
│   └── ValidarOtp.jsx
└── components/            # Componentes reutilizables
```

## Despliegue en AWS S3

Puedes desplegar el frontend en S3 como sitio estático. Usa el script `deploy-frontend.sh`:

```bash
chmod +x deploy-frontend.sh
./deploy-frontend.sh
```

> Asegúrate de que el bucket S3 tenga habilitado el hosting estático y permita lectura pública o tenga una distribución de CloudFront configurada.

## Licencia

MIT