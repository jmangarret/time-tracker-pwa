import { Dictionary } from "./es"

export const en: Dictionary = {
    common: {
        loading: "Loading...",
        error: "Error",
        cancel: "Cancel",
        save: "Save",
        submit: "Submit",
        date: "Date",
        status: "Status",
        actions: "Actions",
        processing: "Processing..."
    },
    auth: {
        signIn: "Sign In",
        email: "Email",
        password: "Password",
        signOut: "Sign Out",
        loginSubtitle: "Enter your credentials to access"
    },
    worker: {
        status: "Current Status",
        activeShift: "Active Shift",
        onBreak: "On Break",
        offDuty: "Off Duty",
        clockIn: "Clock In",
        clockOut: "Clock Out",
        startBreak: "Start Break",
        endBreak: "End Break",
        locationEnabled: "Location Tracking Enabled",
        recentActivity: "Recent Activity",
        requestLeave: "Request Leave",
        payroll: "Payroll (Soon)"
    },
    manager: {
        activeWorkers: "Active Workers",
        todaysActivity: "Today's Activity",
        pendingRequests: "Pending Requests",
        exportCsv: "Export CSV",
        previewData: "Preview Data",
        directLink: "Direct Link",
        currentlyWorking: "Currently Working",
        employee: "Employee",
        time: "Time",
        action: "Action",
        approve: "Approve",
        reject: "Reject",
        editEntry: "Edit Entry",
        editSubtitle: "Edit details for",
        checkIn: "Check In",
        checkOut: "Check Out",
        notes: "Notes",
        copyClipboard: "Copy to Clipboard",
        copied: "Copied!",
        noActive: "No one is clocked in right now.",
        leaveRequests: "Leave Requests Needing Approval"
    },
    leaves: {
        title: "My Leave Requests",
        newRequest: "New Request",
        startDate: "Start Date",
        endDate: "End Date",
        reason: "Reason",
        reasonPlaceholder: "Vacation, Sick Leave, etc.",
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        noLeaves: "No leave requests found."
    }
}
