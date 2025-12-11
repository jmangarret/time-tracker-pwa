"use client"

import { Clock, Coffee, MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface ClockControlProps {
    status: 'CLOCKED_IN' | 'CLOCKED_OUT' | 'ON_BREAK'
    loading: boolean
    lastEntry?: any
    onClock: (action?: string) => void
}

export function ClockControl({ status, loading, lastEntry, onClock }: ClockControlProps) {
    const { t } = useI18n()

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-xl text-center border border-gray-100 dark:border-zinc-700 relative overflow-hidden">
            <div className="text-gray-500 dark:text-gray-400 mb-2 font-medium">{t.worker.status}</div>
            <div className={`text-2xl font-bold mb-8 
            ${status === 'CLOCKED_IN' ? 'text-green-500' : ''}
            ${status === 'ON_BREAK' ? 'text-orange-500' : ''}
            ${status === 'CLOCKED_OUT' ? 'text-gray-400' : ''}
        `}>
                {status === 'CLOCKED_IN' && t.worker.activeShift}
                {status === 'ON_BREAK' && t.worker.onBreak}
                {status === 'CLOCKED_OUT' && t.worker.offDuty}
            </div>

            <button
                onClick={() => onClock()}
                disabled={loading}
                className={`
            w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-2xl border-8 mx-auto z-10 relative
            ${status === 'CLOCKED_IN' ? 'bg-red-500 border-red-200 dark:border-red-900 hover:bg-red-600 shadow-red-500/30' : ''}
            ${status === 'ON_BREAK' ? 'bg-orange-500 border-orange-200 dark:border-orange-900 hover:bg-orange-600 shadow-orange-500/30' : ''}
            ${status === 'CLOCKED_OUT' ? 'bg-indigo-600 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-700 shadow-indigo-500/30' : ''}
            text-white
          `}
            >
                {status === 'ON_BREAK' ? <Coffee size={48} className="mb-2" /> : <Clock size={48} className="mb-2" />}
                <span className="text-2xl font-bold">
                    {loading ? t.common.processing : (
                        status === 'CLOCKED_OUT' ? t.worker.clockIn :
                            status === 'ON_BREAK' ? t.worker.endBreak : t.worker.clockOut
                    )}
                </span>
                {lastEntry && (
                    <span className="text-sm mt-2 opacity-80 font-mono">
                        Since {new Date(lastEntry.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </button>

            {/* Break Button (Only visible when Clocked In) */}
            {status === 'CLOCKED_IN' && (
                <div className="mt-8">
                    <button
                        onClick={() => onClock('BREAK_START')}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-orange-100 text-orange-700 rounded-full font-bold hover:bg-orange-200 transition-colors"
                    >
                        <Coffee size={20} />
                        {t.worker.startBreak}
                    </button>
                </div>
            )}

            <div className="mt-8 flex items-center justify-center text-gray-400 text-sm gap-2">
                <MapPin size={16} />
                {t.worker.locationEnabled}
            </div>
        </div>
    )
}
