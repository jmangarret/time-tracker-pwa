import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { WorkerDashboard } from "./components/WorkerDashboard"
import { ManagerDashboard } from "./components/ManagerDashboard"
import { signOut } from "next-auth/react"
import { LogOut, User } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 lg:p-8">
            <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Timify</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-zinc-800">
                        <User size={16} />
                        <span className="font-medium">{session.user.name}</span>
                        <span className="text-xs uppercase bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-500">{session.user.role}</span>
                    </div>
                    <Link href="/api/auth/signout" className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                {session.user.role === 'MANAGER' ? (
                    <ManagerDashboard />
                ) : (
                    <WorkerDashboard user={session.user} />
                )}
            </div>
        </div>
    )
}
