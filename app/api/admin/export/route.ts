import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'MANAGER') return new NextResponse("Unauthorized", { status: 401 })

    const entries = await prisma.timeEntry.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { checkIn: 'desc' }
    })

    // Basic CSV conversion
    const csvRows = [
        ['User Name', 'Email', 'Type', 'Check In', 'Check Out', 'Duration (Hours)', 'Notes'],
        ...entries.map(e => {
            const duration = e.checkOut ? ((e.checkOut.getTime() - e.checkIn.getTime()) / (1000 * 60 * 60)).toFixed(2) : 'Active'
            return [
                e.user.name,
                e.user.email,
                e.type,
                e.checkIn.toISOString(),
                e.checkOut?.toISOString() || '',
                duration,
                e.notes || ''
            ].map(field => `"${field}"`)
        })
    ]

    const csvContent = csvRows.map(e => e.join(',')).join('\n')

    return new NextResponse(csvContent, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="timesheet-export.csv"'
        }
    })
}
