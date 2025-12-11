"use client"

import { useI18n } from "@/lib/i18n"
import { Globe } from "lucide-react"

export function LanguageToggle() {
    const { language, setLanguage } = useI18n()

    return (
        <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 text-sm font-medium"
            title="Switch Language"
        >
            <Globe size={18} />
            <span>{language.toUpperCase()}</span>
        </button>
    )
}
