const Wrapper = require('./Wrapper')
const Payments = require('./Payments')

class EndPay {
  constructor ({ commerceId, secretKey }) {
    const { axiosInstance } = new Wrapper({ commerceId, secretKey })
    this.payments = new Payments(axiosInstance)
  }
}

module.exports = EndPay
