'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Locale } from '@/i18n.config'
import { getlocales } from '@/app/actions'
import { MainPageData } from '@/types'

const NavBar = ({ lang }: { lang: Locale }) => {
  const [menu, setMenu] = useState<MainPageData | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { main } = await getlocales(lang)
        setMenu(main)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!menu) {
      fetchData()
    }
  }, [lang, menu])

  return (
    <nav>
      <div className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href={`/page/${menu?.home_href}`}
            className="bg-zinc-500/50 border-zinc-500 border px-4 py-2 rounded-md font-semibold">
            {menu?.home}
          </Link>
          <Link
            href={`/page/${menu?.about_href}`}
            className="bg-zinc-500/50 border-zinc-500 border px-4 py-2 rounded-md font-semibold">
            {menu?.about}
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
