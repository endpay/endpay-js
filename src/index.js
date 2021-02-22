const Wrapper = require('./Wrapper')
const Payments = require('./Payments')

class EndPay {
  constructor ({ commerceId, apiKey, baseURL, timeout }) {
    const { axiosInstance } = new Wrapper({ commerceId, apiKey, baseURL, timeout })
    this.payments = new Payments(axiosInstance)
  }
}

module.exports = EndPay
