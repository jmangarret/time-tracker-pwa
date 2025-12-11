"use client"

import { useState, useEffect } from "react"
import { Users, Clock, FileText, Download, Check, X, FileText as FileTextIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { StatCard } from "./ui/StatCard"
import { LanguageToggle } from "./ui/LanguageToggle"
import { ActiveWorkersTable } from "./manager/ActiveWorkersTable"
import { RecentActivityTable } from "./manager/RecentActivityTable"

export function ManagerDashboard() {
    const { t } = useI18n()
    const [data, setData] = useState<any>(null)
    const [leaves, setLeaves] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Edit State
    const [editingEntry, setEditingEntry] = useState<any>(null)
    const [editForm, setEditForm] = useState({ checkIn: '', checkOut: '', notes: '' })

    // Preview State
    const [showPreview, setShowPreview] = useState(false)
    const [previewData, setPreviewData] = useState("")

    const fetchData = async () => {
        try {
            const [dashRes, leavesRes] = await Promise.all([
                fetch('/api/admin/dashboard'),
                fetch('/api/admin/leaves')
            ])
            const dashData = await dashRes.json()
            const leavesData = await leavesRes.json()
            setData(dashData)
            setLeaves(leavesData)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleExport = async () => {
        try {
            const res = await fetch('/api/admin/export')
            if (!res.ok) throw new Error('Export failed')

            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'timesheet-export.csv'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error(error)
            alert("Failed to download export")
        }
    }

    const handlePreview = async () => {
        try {
            const res = await fetch('/api/admin/export')
            const text = await res.text()
            setPreviewData(text)
            setShowPreview(true)
        } catch (e) {
            alert("Failed to load preview")
        }
    }

    const handleLeaveAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        await fetch('/api/admin/leaves', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
        })
        fetchData()
    }

    const handleEditClick = (entry: any) => {
        setEditingEntry(entry)
        const formatDt = (dt: string) => {
            if (!dt) return ''
            const d = new Date(dt)
            return d.toISOString().slice(0, 16)
        }
        setEditForm({
            checkIn: formatDt(entry.checkIn),
            checkOut: entry.checkOut ? formatDt(entry.checkOut) : '',
            notes: entry.notes || ''
        })
    }

    const handleUpdateEntry = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await fetch('/api/admin/times', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editingEntry.id,
                    checkIn: editForm.checkIn,
                    checkOut: editForm.checkOut || null,
                    notes: editForm.notes
                })
            })
            setEditingEntry(null)
            fetchData()
        } catch (err) {
            alert("Failed to update entry")
        }
    }

    if (loading) return <div className="text-center p-8">{t.common.loading}</div>

    const pendingLeaves = leaves.filter(l => l.status === 'PENDING')

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <button onClick={handlePreview} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <FileTextIcon size={16} /> {t.manager.previewData}
                    </button>
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <Download size={16} /> {t.manager.exportCsv}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} title={t.manager.activeWorkers} value={data?.activeCount || 0} colorClass="bg-indigo-100 text-indigo-600" />
                <StatCard icon={Clock} title={t.manager.todaysActivity} value={data?.recentActivity?.length || 0} colorClass="bg-green-100 text-green-600" />
                <StatCard icon={FileText} title={t.manager.pendingRequests} value={pendingLeaves.length} colorClass="bg-orange-100 text-orange-600" />
            </div>

            {/* Pending Leaves */}
            {pendingLeaves.length > 0 && (
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden border-l-4 border-l-orange-400">
                    <div className="p-6 border-b border-gray-100 dark:border-zinc-700">
                        <h3 className="font-bold text-gray-900 dark:text-white">{t.manager.leaveRequests}</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-zinc-700">
                        {pendingLeaves.map(leave => (
                            <div key={leave.id} className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">{leave.user.name} <span className="text-gray-500 font-normal text-sm">({leave.user.email})</span></div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{leave.reason}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleLeaveAction(leave.id, 'APPROVED')} className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                        <Check size={20} />
                                    </button>
                                    <button onClick={() => handleLeaveAction(leave.id, 'REJECTED')} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActiveWorkersTable workers={data?.activeWorkers || []} />
                <RecentActivityTable activity={data?.recentActivity || []} onEdit={handleEditClick} />
            </div>

            {/* Edit Entry Modal */}
            {editingEntry && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg p-6">
                        <h3 className="font-bold text-lg mb-4">{t.manager.editSubtitle} {editingEntry.user.name}</h3>
                        <form onSubmit={handleUpdateEntry} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{t.manager.checkIn}</label>
                                <input type="datetime-local" className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" value={editForm.checkIn} onChange={e => setEditForm({ ...editForm, checkIn: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t.manager.checkOut}</label>
                                <input type="datetime-local" className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" value={editForm.checkOut} onChange={e => setEditForm({ ...editForm, checkOut: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t.manager.notes}</label>
                                <textarea className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" rows={3} value={editForm.notes} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setEditingEntry(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">{t.common.cancel}</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{t.common.save}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="font-bold text-lg">{t.manager.previewData}</h3>
                            <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 overflow-auto flex-1 bg-gray-50 dark:bg-zinc-950 font-mono text-xs whitespace-pre">
                            {previewData}
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                            <button onClick={() => { navigator.clipboard.writeText(previewData); alert(t.manager.copied) }} className="text-indigo-600 font-medium text-sm">
                                {t.manager.copyClipboard}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
