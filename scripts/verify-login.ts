import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'worker@example.com'
    const password = 'password123'

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.log('User not found')
        return
    }

    console.log('User found:', user)

    const isValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isValid)
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
