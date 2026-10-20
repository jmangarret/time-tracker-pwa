# Guía de Despliegue en Producción (Gratis)

Este proyecto está diseñado para desplegarse fácilmente utilizando la capa gratuita de **Vercel** (Frontend/API) y **Neon** o **Supabase** (Base de datos PostgreSQL).

## Paso 1: Preparar la Base de Datos (PostgreSQL)

Como Vercel es "serverless", **no podemos usar SQLite** en producción. Necesitamos una base de datos real.

1.  Crea una cuenta en [Neon.tech](https://neon.tech) (Recomendado) o [Supabase](https://supabase.com).
2.  Crea un nuevo proyecto.
3.  Copia la "Connection String" (te darán algo como `postgres://user:pass@ep-xyz.aws.neon.tech/neondb`).
4.  **IMPORTANTE**: Obtén la versión "Pooled" si usas Neon (generalmente tiene un `-pooler` en la URL o usas el modo de conexión transacción).

## Paso 2: Configurar el Proyecto para Producción

Necesitamos preparar Prisma para usar PostgreSQL en lugar de SQLite.

1.  Abre `prisma/schema.prisma`.
2.  Cambia el provider de `sqlite` a `postgresql`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3.  Genera las migraciones para Postgres (haz esto localmente primero o deja que Vercel lo haga en el build, pero es mejor tener la migración lista).
    *   *Nota: Al cambiar de SQLite a Postgres, es posible que necesites borrar la carpeta `prisma/migrations` y empezar de cero si hay incompatibilidades, o simplemente crear una nueva si está limpio.*

## Paso 3: Subir a GitHub

Asegúrate de que tu código esté actualizado en tu repositorio de GitHub (como hicimos en el paso anterior).

## Paso 4: Despliegue en Vercel

1.  Ve a [Vercel.com](https://vercel.com) e inicia sesión con GitHub.
2.  Haz clic en **"Add New..."** -> **"Project"**.
3.  Importa tu repositorio `time-tracker-pwa`.
4.  **Configuración de Build**:
    *   Framework Preset: Next.js (Detectado automáticamente).
    *   Build Command: `npx prisma generate && next build` (Vercel suele hacerlo solo, pero asegurar `prisma generate` es clave).
5.  **Variables de Entorno (Environment Variables)**:
    Agrega las siguientes:
    *   `DATABASE_URL`: Pega la URL de Neon/Supabase del Paso 1.
    *   `NEXTAUTH_SECRET`: Genera una cadena aleatoria (puedes usar `openssl rand -base64 32` en terminal o una web de contraseñas).
    *   `NEXTAUTH_URL`: La URL que te dará Vercel (ej. `https://tu-app.vercel.app`). *Nota: En Vercel a veces no es estricto, pero es buena práctica*.

6.  Haz clic en **"Deploy"**.

## Paso 5: Inicializar la Base de Datos

Una vez desplegado (o durante el proceso de build si configuras el comando de migración), necesitas crear las tablas en la base de datos de producción.

Si no funciona automático, puedes hacerlo desde tu máquina local conectando a la DB remota:

1.  En tu `.env` local, comenta la DB local y pon la de producción temporalmente.
2.  Ejecuta: `npx prisma db push`
3.  (Opcional) Ejecuta el seed: `npx prisma db seed`.

¡Listo! Tu aplicación debería estar funcionando en Vercel con base de datos en la nube.
