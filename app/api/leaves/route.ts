import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Worker: Get own leaves, Create leave
export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    const leaves = await prisma.leaveRequest.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(leaves)
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const { startDate, endDate, reason } = body

    const leave = await prisma.leaveRequest.create({
        data: {
            userId: session.user.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status: 'PENDING'
        }
    })
    return NextResponse.json(leave)
}
