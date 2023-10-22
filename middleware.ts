import { match } from '@formatjs/intl-localematcher'
import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { authMiddleware } from '@clerk/nextjs'
import { i18n } from './i18n.config'

// Get the preferred locale, similar to above or using a library
const defaultLocale = i18n.defaultLocale
const locales: string[] = [...i18n.locales]

const getLocale = (request: NextRequest): string => {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')

  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()

  if (languages.includes('*')) {
    return defaultLocale
  }

  return match(languages, locales, defaultLocale)
}

const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req)
  },

  publicRoutes: ['/', '/:locale/sign-in'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
