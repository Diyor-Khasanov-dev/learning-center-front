import { useNavigate } from 'react-router-dom'
import { useAuth, useSession } from '@/app/providers/useAuth'
import { useTheme } from '@/app/providers/useTheme'
import { useT } from '@/shared/i18n'
import { AppShell, Button } from '@/shared/ui'
import { AppearanceSection } from '../components/AppearanceSection'
import { CentreSection } from '../components/CentreSection'
import { ImagesSection } from '../components/ImagesSection'
import { PasswordSection } from '../components/PasswordSection'
import { ProfileSection } from '../components/ProfileSection'

export function SettingsPage() {
    const { t } = useT()
    const { signOut } = useAuth()
    const session = useSession()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const isAdmin = session.role === 'ADMINISTRATOR' || session.role === 'SUPER_ADMIN'

    return (
        <AppShell
            subtitle={t('settings.title')}
            onSignOut={signOut}
            token={session.token}
            theme={theme}
            toggleTheme={toggleTheme}
            actions={
                <Button size="sm" onClick={() => navigate('/')}>
                    ← {t('nav.home')}
                </Button>
            }
        >
            {/* Tor ustun: sozlamalar o'qiladigan ro'yxat, keng jadval emas */}
            <div className="mx-auto max-w-2xl">
                <AppearanceSection />
                <ProfileSection />
                <ImagesSection />
                <PasswordSection />
                {isAdmin && <CentreSection />}
            </div>
        </AppShell>
    )
}
