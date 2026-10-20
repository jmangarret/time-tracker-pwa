# ⏱️ Time Tracker PWA

Aplicación Web Progresiva (PWA) moderna para el control de asistencia laboral, gestión de pausas y administración de solicitudes de ausencia en tiempo real.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🚀 Características Principales

- **Fichaje con Geolocalización**: Registro de entradas y salidas con captura de coordenadas GPS.
- **Gestión de Descansos**: Control de pausas activas para cálculo preciso de tiempo efectivo.
- **Panel de Trabajador (`WORKER`)**: Registro de turno, estado de ánimo, notas y solicitudes de permiso.
- **Panel de Supervisor (`MANAGER`)**: Monitoreo en vivo de trabajadores activos, auditoría y corrección de fichajes.
- **Gestión de Solicitudes de Ausencia**: Flujo de aprobación o rechazo de vacaciones y permisos médicos.
- **Exportación de Datos**: Exportación a formato CSV, vista previa en pantalla y copia rápida al portapapeles.
- **Soporte Multi-idioma (i18n)**: Español (por defecto) e Inglés con cambio dinámico.
- **Arquitectura PWA**: Optimizado para dispositivos móviles y de escritorio.

> 📖 Para una explicación paso a paso de cada funcionalidad, consulta la [Guía Funcional Detallada](docs/FUNCIONALIDADES.md).

---

## 🛠️ Stack Tecnológico

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/).
- **Backend / ORM**: [Prisma ORM](https://www.prisma.io/) con base de datos SQLite / PostgreSQL.
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/) y [bcryptjs](https://www.npmjs.com/package/bcryptjs).
- **Fechas**: [date-fns](https://date-fns.org/).

---

## 💻 Inicio Rápido

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/jmangarret/time-tracker-pwa.git
cd time-tracker-pwa
npm install
```

### 2. Configurar variables de entorno
Copia o verifica tu archivo `.env`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="tu-clave-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Migrar base de datos y cargar datos iniciales
```bash
npx prisma db push
npx prisma db seed
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 👥 Credenciales de Demostración

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Empleado** | `ana@example.com` | `password123` |
| **Supervisor** | `manager@example.com` | `password123` |

---

## 📚 Documentación Adicional

- [Guía Funcional de la App](docs/FUNCIONALIDADES.md)
- [Guía de Despliegue](docs/deployment_guide.md)
- [Recorrido de Versiones](docs/walkthrough.md)
