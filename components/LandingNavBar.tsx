import { getlocales } from '@/app/actions'
import { Locale } from '@/i18n.config'
import Link from 'next/link'
import React from 'react'

const LandingNavBar = async ({ lang }: { lang: Locale }) => {
  const { main } = await getlocales(lang)
  return (
    <nav>
      <div className="p-4 flex flex-row items-center justify-between">
        <div className="space-x-2">
          <Link
            href={`/page/${main?.home_href}`}
            className="bg-zinc-500/50 border-zinc-500 border px-4 py-2 rounded-md font-semibold">
            {main.home}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default LandingNavBar
