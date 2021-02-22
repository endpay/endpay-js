const axios = require('axios')
const qs = require('qs')

class Wrapper {
  constructor ({ baseURL, commerceId, apiKey, timeout }) {
    const apiVersion = '1.0'
    const url = `https://api.miu.cl/api/${apiVersion}`
    this.commerceId = commerceId
    this.apiKey = apiKey

    this.axiosInstance = axios.create({
      baseURL: baseURL || url,
      timeout: timeout || 5000
    })

    this.setResponseInterceptors()
    this.setRequestInterceptors()
  }

  setResponseInterceptors () {
    this.axiosInstance.interceptors.response.use(
      response => {
        return response.data
      },
      async error => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response.data.error))
        }

        return Promise.reject(new Error(error.message))
      }
    )
  }

  setRequestInterceptors () {
    this.axiosInstance.interceptors.request.use(async config => {
      if (config.data) {
        config.data = this.updateData(config)
      }

      config.headers.common['x-api-key'] = this.apiKey
      config.headers.common['x-commerce-id'] = this.commerceId

      return config
    })
  }

  updateData ({ data }) {
    const sortedKeys = Object.keys(data).sort()
    let result = {}
    for (const key of sortedKeys) {
      result[key] = data[key]
    }
    result = qs.stringify(result)

    return result
  }
}

module.exports = Wrapper
