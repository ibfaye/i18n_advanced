'use client'

import NavBar from '@/components/NavBar'
import { Locale } from '@/i18n.config'

export default function HomeLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar lang={lang} />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
