import { ApiService } from '@services'

import type { QueryClient, QueryKey } from '@tanstack/vue-query'
import type { AxiosRequestConfig, Method } from 'axios'

/**
 * Vue Query helper for single-use query/mutation functions
 *
 * @param url    - Query URL
 * @param config - Axios configuration (including `method`, `data`, `withCredentials` for CORS, etc)
 *
 * @example
 * const useSampleMutation = (id: string, payload: SomeEntity) => {
 *    return useMutation({
 *      queryFn: getQueryFn<SomeEntity>(`/sample/${id}`, { method: "POST", data: payload, withCredentials: true })
 *    });
 * }
 *
 * @throws API request error
 * @returns Unwrapped query `data`
 */
export const getQueryFn = async <T>(
  url: string,
  config: AxiosRequestConfig & {
    method?: Method | 'postForm' | 'patchForm'
    withCredentials?: boolean
  } = {},
): Promise<T> => {
  const axiosConfig = {
    ...config,
    withCredentials: config.withCredentials ?? false,
  }

  if (axiosConfig.method == 'postForm') {
    return ApiService.api
      .postForm(url, axiosConfig.data, axiosConfig)
      .then(({ data }: { data: T }) => data)
  }

  if (axiosConfig.method == 'patchForm') {
    return ApiService.api
      .patchForm(url, axiosConfig.data, axiosConfig)
      .then(({ data }: { data: T }) => data)
  }
  return ApiService.api(url, {
    method: 'GET',
    ...axiosConfig,
  }).then(({ data }: { data: T }) => data)
}

export const invalidateQueries = (queryClient: QueryClient, keys: QueryKey[]) => {
  const invalidationPromises = keys.map((key) =>
    queryClient.invalidateQueries({
      queryKey: key,
    }),
  )
  return invalidationPromises
}
