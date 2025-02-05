import { router } from './router'

import type { LocationQuery, RouteLocationNormalized } from 'vue-router'

/** Get a redirect target from URL */
const getUrlRedirect = (route: RouteLocationNormalized): string | null => {
  const { redirect } = route.query
  return redirect && typeof redirect == 'string' ? redirect : null
}

/**
 * Handle a URL redirect (manual replacement)
 *
 * @returns Whether URL was redirected
 */
const handleUrlRedirect = (route: RouteLocationNormalized): boolean => {
  const redirect = getUrlRedirect(route)
  if (redirect) {
    router.replace(redirect)
    return true
  }
  return false
}

/**
 * Parse values from query params
 *
 * NOTE: Parses comma-separated strings into an array (typically IDs).
 *
 * @param   query         - URL query params
 * @param   defaultValues - Default search values (drives parsing)
 * @returns Parsed search values
 */
const parseQueryParams = <T extends Record<string, string | string[]>>(
  query: LocationQuery,
  defaultValues: T,
): T => {
  return Object.keys(defaultValues).reduce(
    (accum, key) => {
      const defaultValue = defaultValues[key]
      let urlValue = query[key]
      if (!urlValue || !urlValue.length) {
        return accum
      }

      const arrayType = Array.isArray(defaultValue)
      if (arrayType) {
        // Arrays may be represented in URL array format or as a comma-separated string
        urlValue = Array.isArray(urlValue) ? urlValue : urlValue.split(',').filter((x) => x)
      } else {
        // Use first element from arrays provided in place of expected strings
        urlValue = Array.isArray(urlValue) ? urlValue[0] : urlValue
      }

      return { ...accum, [key]: urlValue }
    },
    { ...defaultValues },
  )
}

export { getUrlRedirect, handleUrlRedirect, parseQueryParams }
