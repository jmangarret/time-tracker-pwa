"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { LanguageToggle } from "../dashboard/components/ui/LanguageToggle"

export default function LoginPage() {
    const { t } = useI18n()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setError(t.common.error)
            } else {
                router.refresh()
                router.push("/dashboard")
            }
        } catch (err) {
            setError(t.common.error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 relative">
            <div className="absolute top-4 right-4">
                <LanguageToggle />
            </div>
            <div className="w-full max-w-sm space-y-8 rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{t.auth.signIn}</h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t.auth.loginSubtitle}</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">{t.auth.email}</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"
                                placeholder={t.auth.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">{t.auth.password}</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-colors"
                                placeholder={t.auth.password}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 transition-all shadow-lg shadow-indigo-500/20"
                        >
                            {loading ? t.common.processing : t.auth.signIn}
                        </button>
                    </div>
                </form>
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 space-y-1">
                    <p>Manager Demo: <span className="font-mono text-indigo-500">manager@example.com</span> / <span className="font-mono">password123</span></p>
                    <p>Worker Demo: <span className="font-mono text-indigo-500">worker@example.com</span> / <span className="font-mono">password123</span></p>
                </div>
            </div>
        </div>
    )
}
