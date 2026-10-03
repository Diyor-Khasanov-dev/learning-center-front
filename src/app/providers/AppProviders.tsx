import { useState, type ComponentType, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/shared/ui'
import { AuthProvider } from './AuthProvider'
import { createQueryClient } from './queryClient'
import { LocaleProvider } from './LocaleProvider'
import { ThemeProvider } from './ThemeProvider'

interface AppProvidersProps {
    children: ReactNode
    /**
     * Marshrutlagichni almashtirish uchun. Odatda kerak emas; demo build
     * `MemoryRouter` beradi, chunki u iframe ichida ishlaydi va u yerda
     * URL o'zgartirish (pushState) bloklanishi mumkin.
     */
    router?: ComponentType<{ children: ReactNode }>
}

export function AppProviders({ children, router: Router = BrowserRouter }: AppProvidersProps) {
    const [queryClient] = useState(createQueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            <LocaleProvider>
                <ThemeProvider>
                    <Router>
                        <AuthProvider>{children}</AuthProvider>
                    </Router>
                    <Toaster />
                </ThemeProvider>
            </LocaleProvider>
        </QueryClientProvider>
    )
}
