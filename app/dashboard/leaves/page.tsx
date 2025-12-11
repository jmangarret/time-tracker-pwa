"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function LeavesPage() {
    const router = useRouter()
    const [leaves, setLeaves] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Form State
    const [showForm, setShowForm] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [reason, setReason] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetch('/api/leaves')
            .then(res => res.json())
            .then(data => {
                setLeaves(data)
                setLoading(false)
            })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await fetch('/api/leaves', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startDate, endDate, reason })
            })
            setShowForm(false)
            setSubmitting(false)
            // Refresh
            const res = await fetch('/api/leaves')
            const data = await res.json()
            setLeaves(data)
        } catch (e) {
            setSubmitting(false)
            alert("Failed to submit")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 bg-white dark:bg-zinc-800 rounded-full shadow-sm hover:scale-105 transition-transform">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold">My Leave Requests</h1>
                </div>

                {showForm ? (
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 mb-8">
                        <h2 className="text-lg font-bold mb-4">New Request</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                    <input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                    <input required type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
                                <textarea required value={reason} onChange={e => setReason(e.target.value)} placeholder="Vacation, Sick Leave, etc." className="w-full p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700" rows={3} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                    {submitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button onClick={() => setShowForm(true)} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2 mb-8 font-medium">
                        <Plus size={20} /> Create New Request
                    </button>
                )}

                <div className="space-y-4">
                    {leaves.map((leave: any) => (
                        <div key={leave.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 flex justify-between items-start">
                            <div>
                                <div className="font-semibold text-lg">{leave.reason}</div>
                                <div className="text-gray-500 text-sm mt-1">
                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                            ${leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' : ''}
                            ${leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' : ''}
                            ${leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : ''}
                        `}>
                                {leave.status}
                            </div>
                        </div>
                    ))}
                    {!loading && leaves.length === 0 && (
                        <div className="text-center text-gray-500 py-8">No leave requests found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}
