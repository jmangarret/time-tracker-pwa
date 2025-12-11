import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Admin: Get all pending, Approve/Reject
export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'MANAGER') return new NextResponse("Unauthorized", { status: 401 })

    const leaves = await prisma.leaveRequest.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(leaves)
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'MANAGER') return new NextResponse("Unauthorized", { status: 401 })

    const body = await req.json()
    const { id, status, managerNote } = body // status: APPROVED, REJECTED

    const updated = await prisma.leaveRequest.update({
        where: { id },
        data: { status, managerNote }
    })
    return NextResponse.json(updated)
}
