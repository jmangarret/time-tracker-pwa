import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'MANAGER') return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const { id, checkIn, checkOut, type, notes } = body

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

    const updated = await prisma.timeEntry.update({
        where: { id },
        data: {
            checkIn: checkIn ? new Date(checkIn) : undefined,
            checkOut: checkOut ? new Date(checkOut) : null, // Allow clearing checkout if needed, or update
            type,
            notes
        }
    })

    return NextResponse.json(updated)
}
