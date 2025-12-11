"use client"

import { useI18n } from "@/lib/i18n"

export function ActiveWorkersTable({ workers }: { workers: any[] }) {
    const { t } = useI18n()

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white">{t.manager.currentlyWorking}</h3>
            </div>
            <div className="p-0">
                {workers.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">{t.manager.noActive}</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-3">{t.manager.employee}</th>
                                <th className="px-6 py-3">{t.manager.checkIn}</th>
                                <th className="px-6 py-3">{t.common.status}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workers.map((entry: any) => (
                                <tr key={entry.id} className="border-b dark:border-zinc-700">
                                    <td className="px-6 py-4 font-medium">{entry.user.name}</td>
                                    <td className="px-6 py-4">{new Date(entry.checkIn).toLocaleTimeString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${entry.type === 'BREAK' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {entry.type === 'BREAK' ? t.worker.onBreak : t.worker.activeShift}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
