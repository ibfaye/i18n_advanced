'use client'

import { getlocales } from '@/app/actions'
import { Locale } from '@/i18n.config'
import { MainPageData } from '@/types'
import React, { useEffect, useState } from 'react'

const Home = ({ params: { lang } }: { params: { lang: Locale } }) => {
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
    <main className="relative h-screen">
      <article className="grid lg:grid-cols-2 ">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold pb-4">{menu?.title}</h1>
          <p className="mt-2 text-lg">{menu?.desc}</p>
        </div>
      </article>
    </main>
  )
}

export default Home
