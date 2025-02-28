import axios from 'axios'
import qs from 'qs'

import config from '@config'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const createApiInstance = (overrides: AxiosRequestConfig = {}): AxiosInstance => {
  return axios.create({
    baseURL: config.api.url,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
    ...overrides,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(overrides.headers ?? {}),
    },
  })
}

class ApiService {
  api: AxiosInstance
  refreshCallsSinceLastApiCall = 0

  constructor() {
    this.api = createApiInstance()

    this.api.interceptors.request.use((config) => this.interceptRequests(config))

    this.api.interceptors.response.use(
      (response) => response,
      (error) => this.interceptErrors(error),
    )
  }
}

const singleton = new ApiService()
export default singleton

export { createApiInstance }
