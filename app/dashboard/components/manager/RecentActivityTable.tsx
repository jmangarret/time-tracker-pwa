"use client"

import { useI18n } from "@/lib/i18n"

interface RecentActivityTableProps {
    activity: any[]
    onEdit: (entry: any) => void
}

export function RecentActivityTable({ activity, onEdit }: RecentActivityTableProps) {
    const { t } = useI18n()

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white">{t.manager.todaysActivity}</h3>
            </div>
            <div className="p-0">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-zinc-900/50">
                        <tr>
                            <th className="px-6 py-3">{t.manager.employee}</th>
                            <th className="px-6 py-3">{t.manager.action}</th>
                            <th className="px-6 py-3">{t.manager.time}</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {activity.map((entry: any) => (
                            <tr key={entry.id} className="border-b dark:border-zinc-700">
                                <td className="px-6 py-4 font-medium">{entry.user.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs 
                            ${entry.checkOut ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'}
                            ${entry.type === 'BREAK' ? 'bg-orange-100! text-orange-600!' : ''}
                        `}>
                                        {entry.checkOut ? (entry.type === 'BREAK' ? t.worker.endBreak : t.worker.clockOut) : (entry.type === 'BREAK' ? t.worker.startBreak : t.worker.clockIn)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {entry.checkOut ? new Date(entry.checkOut).toLocaleTimeString() : new Date(entry.checkIn).toLocaleTimeString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onEdit(entry)} className="text-indigo-600 hover:text-indigo-800 text-xs font-bold uppercase">{t.common.actions}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
