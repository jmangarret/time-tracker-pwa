"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { es, Dictionary } from "@/dictionaries/es"
import { en } from "@/dictionaries/en"

type Language = 'es' | 'en'

interface I18nContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Dictionary
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('es') // Default Spanish

    // Persist preference
    useEffect(() => {
        const saved = localStorage.getItem('timify-lang') as Language
        if (saved && (saved === 'es' || saved === 'en')) {
            setLanguage(saved)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('timify-lang', lang)
    }

    const t = language === 'es' ? es : en

    return (
        <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider")
    }
    return context
}
