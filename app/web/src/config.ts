interface WebConfig {
  api: WebApiConfig
  app: WebAppConfig
}

interface WebApiConfig {
  url: string
}

const apiUrl = import.meta.env.VITE_API_URL
if (!apiUrl) {
  throw new Error('API url is missing!')
}

const webConfig: WebConfig = {
  api: {
    url: apiUrl as string,
  },
}

export default webConfig
