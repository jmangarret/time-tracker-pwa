import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'MANAGER') {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Real active workers (those with open TimeEntry)
    const activeEntries = await prisma.timeEntry.findMany({
        where: { checkOut: null },
        include: {
            user: {
                select: { name: true, email: true }
            }
        }
    })

    // Recent 10 entries
    const recentEntries = await prisma.timeEntry.findMany({
        take: 10,
        orderBy: { checkIn: 'desc' },
        include: {
            user: {
                select: { name: true, email: true }
            }
        }
    })

    return NextResponse.json({
        activeCount: activeEntries.length,
        activeWorkers: activeEntries,
        recentActivity: recentEntries
    })
}
