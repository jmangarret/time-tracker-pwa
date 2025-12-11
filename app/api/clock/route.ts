import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    // Get current status (last entry without checkout)
    const currentEntry = await prisma.timeEntry.findFirst({
        where: {
            userId: session.user.id,
            checkOut: null
        }
    })

    // Get recent history
    const history = await prisma.timeEntry.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            checkIn: 'desc'
        },
        take: 5
    })

    return NextResponse.json({
        status: currentEntry ? (currentEntry.type === 'BREAK' ? 'ON_BREAK' : 'CLOCKED_IN') : 'CLOCKED_OUT',
        entry: currentEntry,
        history
    })
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const { action, lat, lng, notes } = body
    // action: 'IN', 'OUT', 'BREAK_START', 'BREAK_END'

    if (action === 'IN') {
        const existing = await prisma.timeEntry.findFirst({ where: { userId: session.user.id, checkOut: null } })
        if (existing) return NextResponse.json({ error: "Already active" }, { status: 400 })

        const entry = await prisma.timeEntry.create({
            data: {
                userId: session.user.id,
                type: 'WORK',
                latIn: lat,
                lngIn: lng,
                checkIn: new Date(),
                notes: notes,
            }
        })
        return NextResponse.json(entry)
    }

    if (action === 'OUT') {
        const existing = await prisma.timeEntry.findFirst({ where: { userId: session.user.id, checkOut: null } })
        if (!existing) return NextResponse.json({ error: "Not active" }, { status: 400 })

        // If on break, must end break first? Or just close it. Let's close it.

        const entry = await prisma.timeEntry.update({
            where: { id: existing.id },
            data: {
                checkOut: new Date(),
                latOut: lat,
                lngOut: lng,
                notes: notes ? existing.notes + '\n' + notes : existing.notes,
            }
        })
        return NextResponse.json(entry)
    }

    if (action === 'BREAK_START') {
        // Determine if currently working
        const existingWork = await prisma.timeEntry.findFirst({
            where: { userId: session.user.id, checkOut: null, type: 'WORK' }
        })
        if (!existingWork) return NextResponse.json({ error: "Must be clocked in to take a break" }, { status: 400 })

        // Pause work (clock out work entry)
        await prisma.timeEntry.update({
            where: { id: existingWork.id },
            data: { checkOut: new Date(), notes: existingWork.notes ? existingWork.notes + ' (Break Start)' : 'Break Start' }
        })

        // Start break entry
        const breakEntry = await prisma.timeEntry.create({
            data: {
                userId: session.user.id,
                type: 'BREAK',
                latIn: lat, lngIn: lng,
                checkIn: new Date(),
                notes: 'Break'
            }
        })
        return NextResponse.json(breakEntry)
    }

    if (action === 'BREAK_END') {
        const existingBreak = await prisma.timeEntry.findFirst({
            where: { userId: session.user.id, checkOut: null, type: 'BREAK' }
        })
        if (!existingBreak) return NextResponse.json({ error: "Not on break" }, { status: 400 })

        // End break
        await prisma.timeEntry.update({
            where: { id: existingBreak.id },
            data: { checkOut: new Date() }
        })

        // Resume work
        const workEntry = await prisma.timeEntry.create({
            data: {
                userId: session.user.id,
                type: 'WORK',
                latIn: lat, lngIn: lng,
                checkIn: new Date(),
                notes: 'Resumed from break'
            }
        })
        return NextResponse.json(workEntry)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
