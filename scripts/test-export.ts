import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Fetching entries...")
    const entries = await prisma.timeEntry.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { checkIn: 'desc' }
    })
    console.log(`Found ${entries.length} entries`)

    const csvRows = [
        ['User Name', 'Email', 'Type', 'Check In', 'Check Out', 'Duration (Hours)', 'Notes'],
        ...entries.map(e => {
            const duration = e.checkOut ? ((e.checkOut.getTime() - e.checkIn.getTime()) / (1000 * 60 * 60)).toFixed(2) : 'Active'
            return [
                e.user.name,
                e.user.email,
                e.type,
                e.checkIn.toISOString(),
                e.checkOut ? e.checkOut.toISOString() : '',
                duration,
                e.notes || ''
            ].map(field => `"${field}"`)
        })
    ]
    const csvContent = csvRows.map(e => e.join(',')).join('\n')
    console.log("CSV Generation successful. Preview:")
    console.log(csvContent.slice(0, 200) + "...")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
