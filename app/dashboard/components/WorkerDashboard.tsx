"use client"

import { useState, useEffect } from "react"
import { History, AlertCircle, CalendarPlus } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { ClockControl } from "./worker/ClockControl"
import { LanguageToggle } from "./ui/LanguageToggle"

export function WorkerDashboard({ user }: { user: any }) {
    const { t } = useI18n()
    const [status, setStatus] = useState<'CLOCKED_IN' | 'CLOCKED_OUT' | 'ON_BREAK' | 'LOADING'>('LOADING')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState<any[]>([])
    const [currentEntry, setCurrentEntry] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/clock')
            const data = await res.json()
            setStatus(data.status)
            setHistory(data.history || [])
            setCurrentEntry(data.entry)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchStatus()
    }, [])

    const handleClock = async (actionOverride?: string) => {
        setLoading(true)
        setError(null)

        if (!navigator.geolocation) {
            setError("Geolocation is not supported")
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                let action = 'IN'
                if (actionOverride) {
                    action = actionOverride
                } else {
                    if (status === 'CLOCKED_IN') action = 'OUT'
                    if (status === 'ON_BREAK') action = 'BREAK_END'
                    if (status === 'CLOCKED_OUT') action = 'IN'
                }

                const res = await fetch('/api/clock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                })

                if (!res.ok) {
                    const errData = await res.json()
                    throw new Error(errData.error || "Failed")
                }

                await fetchStatus()
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }, (err) => {
            setError("Location permission required")
            setLoading(false)
        })
    }

    if (status === 'LOADING') return <div className="p-8 text-center text-gray-500 text-lg animate-pulse">{t.common.loading}</div>

    return (
        <div className="max-w-md mx-auto space-y-8 relative">
            <div className="absolute -top-12 right-0">
                <LanguageToggle />
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <ClockControl status={status as any} loading={loading} lastEntry={currentEntry} onClock={handleClock} />

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/leaves" className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <CalendarPlus size={24} />
                    </div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{t.worker.requestLeave}</span>
                </Link>
                {/* Placeholder for future features */}
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col items-center justify-center gap-2 opacity-50">
                    <span className="font-semibold text-gray-400">{t.worker.payroll}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-zinc-700">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <History size={20} />
                    {t.worker.recentActivity}
                </h3>
                <div className="space-y-4">
                    {history.map((entry) => (
                        <div key={entry.id} className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-700 pb-3 last:border-0 last:pb-0">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${entry.type === 'BREAK' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                    <div className="font-medium text-gray-900 dark:text-gray-100">{new Date(entry.checkIn).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                                </div>
                                <div className="text-xs text-gray-500 pl-4">
                                    {entry.type === 'BREAK' ? 'Break: ' : 'Shift: '}
                                    {new Date(entry.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {' - '}
                                    {entry.checkOut ? new Date(entry.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active'}
                                </div>
                            </div>
                            <div className={`text-sm font-semibold ${entry.checkOut ? 'text-gray-500' : 'text-green-500'}`}>
                                {entry.checkOut ?
                                    'Completed'
                                    : 'Active'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
