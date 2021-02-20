class Payment {
  constructor (axiosInstance) {
    this.axiosInstance = axiosInstance
  }

  read (id) {
    return this.axiosInstance.get(`/payments/${id}`)
  }

  create (params) {
    return this.axiosInstance.post('/payments', params)
  }

  delete (id) {
    return this.axiosInstance.delete(`/payments/${id}`)
  }
}

module.exports = Payment
