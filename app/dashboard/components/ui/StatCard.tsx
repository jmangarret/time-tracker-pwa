import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
    icon: LucideIcon
    title: string
    value: string | number
    colorClass: string
}

export function StatCard({ icon: Icon, title, value, colorClass }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
            </div>
        </div>
    )
}
