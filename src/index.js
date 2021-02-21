const Wrapper = require('./Wrapper')
const Payments = require('./Payments')

class EndPay {
  constructor ({ commerceId, secretKey, baseURL, timeout }) {
    const { axiosInstance } = new Wrapper({ commerceId, secretKey, baseURL, timeout })
    this.payments = new Payments(axiosInstance)
  }
}

module.exports = EndPay
