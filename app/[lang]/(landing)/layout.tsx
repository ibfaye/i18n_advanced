import LandingNavBar from '@/components/LandingNavBar'
import { Locale } from '@/i18n.config'

export default function LandingLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavBar lang={lang} />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
