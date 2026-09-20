# NovaOrbit Aerospace

Aplicación web de demostración para un centro de control de misiones espaciales. La interfaz presenta un acceso con cuentas locales y una dashboard profesional con datos ficticios de operaciones orbitales.

## Dashboard de operaciones

La vista protegida `/dashboard` incluye:

- Resumen diario y estado operativo del sistema.
- Indicadores de misiones activas, satélites en órbita, datos procesados y próximo hito.
- Misiones de ejemplo con estado, avance y fechas estimadas.
- Visualización de flota, telemetría y actividad reciente.
- Bloque de preparación para la misión Lumen Relay.

Todos los indicadores y nombres operativos son datos ficticios creados para demostrar la interfaz.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre la dirección indicada por Vite. Registra una cuenta para acceder a la dashboard; los datos de sesión se guardan localmente en el navegador.

## Tecnologías

- React 19
- React Router
- Vite
- Tailwind CSS
