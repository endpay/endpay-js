const axios = require('axios')
const crypto = require('crypto')
const qs = require('qs')

class Wrapper {
  constructor ({ commerceId, secretKey, timeout }) {
    const apiVersion = '1.0'
    const baseURL = `https://api.miu.cl/api/${apiVersion}`
    this.commerceId = commerceId
    this.secretKey = secretKey

    this.axiosInstance = axios.create({
      baseURL,
      timeout: timeout || 5000
    })

    this.setResponseInterceptors()
    this.setRequestInterceptors()
  }

  setAuthorization (authToken) {
    this.axiosInstance.defaults.headers.common.Authorization = authToken
  }

  setResponseInterceptors () {
    this.axiosInstance.interceptors.response.use(
      response => {
        return response.data
      },
      async error => {
        if (error.isAxiosError) {
          return Promise.reject(new Error(error.response.data.message))
        }

        return Promise.reject(new Error(error.message))
      }
    )
  }

  generateHash ({ config }) {
    const { method, url, baseURL, data } = config
    const completeURL = `${baseURL}${url}`
    let toSign = `${method.toUpperCase()}&${encodeURIComponent(completeURL)}`

    if (data) {
      toSign += `&${data}`
    }

    return crypto.createHmac('sha256', this.secretKey).update(toSign).digest('hex')
  }

  setRequestInterceptors () {
    this.axiosInstance.interceptors.request.use(async config => {
      if (config.data) {
        config.data = this.updateData(config)
      }

      config.headers.common.Authorization = this.getHash({ config })

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

  getHash ({ config }) {
    const hash = this.generateHash({ config })

    return `${this.commerceId}:${hash}`
  }
}

module.exports = Wrapper
