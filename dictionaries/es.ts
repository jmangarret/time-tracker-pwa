export const es = {
    common: {
        loading: "Cargando...",
        error: "Error",
        cancel: "Cancelar",
        save: "Guardar",
        submit: "Enviar",
        date: "Fecha",
        status: "Estado",
        actions: "Acciones",
        processing: "Procesando..."
    },
    auth: {
        signIn: "Iniciar Sesión",
        email: "Correo Electrónico",
        password: "Contraseña",
        signOut: "Cerrar Sesión",
        loginSubtitle: "Ingresa tus credenciales para acceder"
    },
    worker: {
        status: "Estado Actual",
        activeShift: "Turno Activo",
        onBreak: "En Descanso",
        offDuty: "Fuera de Turno",
        clockIn: "Entrada",
        clockOut: "Salida",
        startBreak: "Iniciar Descanso",
        endBreak: "Terminar Descanso",
        locationEnabled: "Localización Activada",
        recentActivity: "Actividad Reciente",
        requestLeave: "Solicitar Permiso",
        payroll: "Nómina (Pronto)"
    },
    manager: {
        activeWorkers: "Trabajadores Activos",
        todaysActivity: "Actividad de Hoy",
        pendingRequests: "Solicitudes Pendientes",
        exportCsv: "Exportar CSV",
        previewData: "Vista Previa",
        directLink: "Enlace Directo",
        currentlyWorking: "Trabajando Actualmente",
        employee: "Empleado",
        time: "Hora",
        action: "Acción",
        approve: "Aprobar",
        reject: "Rechazar",
        editEntry: "Editar Entrada",
        editSubtitle: "Editar detalles de",
        checkIn: "Hora Entrada",
        checkOut: "Hora Salida",
        notes: "Notas",
        copyClipboard: "Copiar al Portapapeles",
        copied: "¡Copiado!",
        noActive: "Nadie trabajando en este momento.",
        leaveRequests: "Solicitudes de Permiso"
    },
    leaves: {
        title: "Mis Solicitudes",
        newRequest: "Nueva Solicitud",
        startDate: "Fecha Inicio",
        endDate: "Fecha Fin",
        reason: "Razón",
        reasonPlaceholder: "Vacaciones, Enfermedad, etc.",
        pending: "Pendiente",
        approved: "Aprobado",
        rejected: "Rechazado",
        noLeaves: "No hay solicitudes encontradas."
    }
}

export type Dictionary = typeof es
