import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    // Manager
    await prisma.user.upsert({
        where: { email: 'manager@example.com' },
        update: {},
        create: {
            email: 'manager@example.com',
            name: 'Admin Manager',
            password,
            role: 'MANAGER'
        }
    })

    // Workers
    const workers = [
        { email: 'worker@example.com', name: 'John Worker' },
        { email: 'carlos@example.com', name: 'Carlos Ruiz' },
        { email: 'ana@example.com', name: 'Ana Garcia' },
        { email: 'david@example.com', name: 'David Smith' },
        { email: 'elena@example.com', name: 'Elena Rodriguez' }
    ]

    for (const w of workers) {
        await prisma.user.upsert({
            where: { email: w.email },
            update: {},
            create: {
                email: w.email,
                name: w.name,
                password,
                role: 'WORKER'
            }
        })
    }

    // Seed detailed time entries for Carlos (Active)
    const carlos = await prisma.user.findUnique({ where: { email: 'carlos@example.com' } })
    if (carlos) {
        // Completed yesterday
        await prisma.timeEntry.create({
            data: {
                userId: carlos.id,
                type: 'WORK',
                checkIn: new Date(Date.now() - 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000), // Yesterday morning
                checkOut: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday evening
                notes: 'Regular shift'
            }
        })
        // Active today
        await prisma.timeEntry.create({
            data: {
                userId: carlos.id,
                type: 'WORK',
                checkIn: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                latIn: 40.7128, lngIn: -74.0060,
                notes: 'Morning shift'
            }
        })
    }

    // Seed Ana (On Break)
    const ana = await prisma.user.findUnique({ where: { email: 'ana@example.com' } })
    if (ana) {
        const yesterday = new Date(Date.now() - 4 * 60 * 60 * 1000)
        await prisma.timeEntry.create({
            data: {
                userId: ana.id,
                type: 'WORK',
                checkIn: yesterday,
                checkOut: new Date(), // Just completed work chunk before break
                notes: 'Pre-break'
            }
        })
        await prisma.timeEntry.create({
            data: {
                userId: ana.id,
                type: 'BREAK',
                checkIn: new Date(),
                notes: 'Lunch break'
            }
        })
        // Create a leave request
        await prisma.leaveRequest.create({
            data: {
                userId: ana.id,
                startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                reason: 'Doctor Appointment',
                status: 'PENDING'
            }
        })
    }

    console.log('Seeding complete')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
