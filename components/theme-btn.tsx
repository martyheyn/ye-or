'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react'

export default function ThemeBtn() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="relative rounded-4xl border w-24 h-10">
            <div className={`absolute top-0 -left-2 w-full h-full px-2 flex items-center`}>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`w-ful h-full px-4 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out cursor-pointer ${theme === 'dark' ? 'translate-x-0' : 'translate-x-10'}`}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    )
}