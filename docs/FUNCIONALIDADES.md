# Guía Funcional de la Aplicación - Time Tracker PWA

Documentación detallada sobre las funciones, flujos de trabajo y características del sistema de gestión de asistencia y control de tiempo **Time Tracker**.

---

## 📌 Visión General

**Time Tracker PWA** es una aplicación web progresiva diseñada para el registro, supervisión y administración de jornadas laborales en tiempo real. Permite a los empleados registrar sus entradas, pausas y solicitudes de ausencia con geolocalización, y a los supervisores monitorear la actividad del equipo y auditar los registros.

---

## 👥 Roles del Sistema

La plataforma cuenta con dos roles diferenciados:

| Rol | Descripción | Acceso Principal |
| :--- | :--- | :--- |
| **Empleado (`WORKER`)** | Registro de jornada diaria, pausas y solicitudes de permisos. | Panel del Empleado |
| **Supervisor (`MANAGER`)** | Monitoreo de equipo en vivo, aprobación de permisos, edición de fichajes y exportación. | Panel de Control Gerencial |

---

## ⚡ Funcionalidades para Empleados (`WORKER`)

### 1. Control de Jornada (Fichaje con Geolocalización)
- **Entrada (Clock In)**: Registra el inicio de la jornada laboral capturando la fecha, hora y coordenadas GPS (latitud y longitud) del dispositivo para verificar la ubicación.
- **Salida (Clock Out)**: Cierra la jornada laboral activa con el registro de ubicación de cierre.
- **Indicador de Estado Actual**:
  - 🟢 **Turno Activo**: El trabajador está cumpliendo su jornada.
  - 🟡 **En Descanso**: El trabajador se encuentra en una pausa activa.
  - ⚪ **Fuera de Turno**: Jornada no iniciada o ya concluida.

### 2. Gestión de Descansos / Pausas
- **Iniciar Descanso**: Pasa el estado a descanso y pausa el cómputo de horas efectivas sin cerrar el turno general.
- **Terminar Descanso**: Reanuda inmediatamente el turno activo.

### 3. Registro de Estado de Ánimo y Notas
- Posibilidad de calificar la jornada laboral (escala de satisfacción 1 a 5) y adjuntar comentarios o notas sobre incidentes o actividades realizadas.

### 4. Gestión de Permisos y Ausencias
- **Crear Solicitud**: Permite solicitar ausencias especificando:
  - Fecha de inicio y fecha de fin.
  - Motivo de la solicitud (vacaciones, incapacidad médica, permiso personal, etc.).
- **Seguimiento de Estado**:
  - ⏳ **Pendiente**: En espera de revisión por el supervisor.
  - ✅ **Aprobado**: Permiso autorizado.
  - ❌ **Rechazado**: Solicitud declinada con nota explicativa del supervisor.

---

## 📊 Funcionalidades para Supervisores (`MANAGER`)

### 1. Monitoreo en Tiempo Real
- **Trabajadores Activos**: Lista en vivo de todos los empleados que tienen un turno abierto en el momento, junto a su hora de entrada y ubicación.
- **Actividad del Día**: Conteo de turnos iniciados, pausas y estado general del personal.

### 2. Aprobación y Gestión de Solicitudes
- Bandeja de solicitudes de ausencia pendientes.
- Acciones rápidas de **Aprobar** o **Rechazar**.
- Capacidad de incluir una **nota de gerencia** justificando la decisión.

### 3. Corrección y Auditoría de Fichajes
- Permite a los supervisores corregir errores en los registros de los empleados:
  - Ajuste de hora de entrada (`checkIn`).
  - Ajuste de hora de salida (`checkOut`).
  - Adición de notas explicativas para trazabilidad.

### 4. Reportes y Exportación de Datos
- **Exportar a CSV**: Descarga un archivo compatible con Excel y sistemas de nómina con todos los registros filtrados.
- **Vista Previa de Datos**: Visualización rápida en modal sin necesidad de descargar archivos.
- **Copiar al Portapapeles**: Copia directa de la tabla con un clic para pegar en hojas de cálculo.

---

## 🌐 Características Globales

- **Soporte Multi-idioma (i18n)**:
  - Idiomas disponibles: **Español** (por defecto) e **Inglés**.
  - Cambio instantáneo mediante el selector de idioma (icono de globo terráqueo 🌐) sin recargar la página.
- **Diseño Responsivo (PWA)**:
  - Adaptado para dispositivos móviles, tablets y monitores de escritorio.
  - Diseñado con estética moderna y accesible.
- **Seguridad**:
  - Autenticación segura mediante sesiones con `next-auth`.
  - Cifrado de contraseñas con `bcryptjs`.
  - Protección de rutas basada en roles.

---

## 🔑 Credenciales de Prueba (Entorno de Desarrollo)

| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Empleado** | `ana@example.com` | `password123` |
| **Supervisor** | `manager@example.com` | `password123` |
