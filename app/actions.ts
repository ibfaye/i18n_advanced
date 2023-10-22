'use server'

import { Locale, i18n } from '@/i18n.config'
import { PageData } from '@/types'

const dictionaries: { [key in Locale]: Promise<PageData> } = {
  en: import('@/locales/en.json').then((module) => module.default as PageData),
  fr: import('@/locales/fr.json').then((module) => module.default as PageData),
}

export const getlocales = async (locale: Locale): Promise<PageData> => {
  try {
    const dictionary = await dictionaries[locale]
    if (!dictionary) {
      console.warn(
        `Dictionary not found for locale '${locale}', falling back to default locale '${i18n.defaultLocale}'`
      )
      return await dictionaries[i18n.defaultLocale]
    }
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale '${locale}': ${error}`)
    return await dictionaries[i18n.defaultLocale]
  }
}
