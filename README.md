# EndPay Node JS

## Complete documentation

This library is an implementation made in javascript of the [EndPay API](https://endpay.cl), it is incomplete and only contemplates functionalities that will be used by banks and payments, if you want to add the rest, do it without problems.

## Support Version

Current support [EndPay API](https://endpay.cl/page/api) version 1.0 

### Install

Npm:
```bash
npm install --save endpayjs
```

Yarn: 
```bash
yarn add endpayjs
```

## Getting started

### Authenticate with your Commerce ID Key, and Secret Key

Make sure you have created your free account on [EndPay](https://endpay.cl) and that you have your **Credentials**.

```javascript
// CommonJS
const EndPay = require('endpay');

// ES6 / Typescript
import EndPay from 'endpay'

const endPay = new EndPay({
  commerceId: 'COMMERCE_ID',
  apiKey: 'YOUR_API_KEY'
})
```

### Payments

#### Create payment

```javascript
endPay.payments
  .create({
    subject: 'First Product',
    amount: '1000'
  })
  .then(response => {})
  .catch(error => console.log(error)) // Handle the error.
```

#### Read payment

```javascript
endPay.payments
  .read(paymentId)
  .then(response => {})
  .catch(error => console.log(error)) // Handle the error.
```

#### Delete payment

```javascript
endPay.payments
  .delete(paymentId)
  .then(response => {})
  .catch(error => console.log(error)) // Handle the error.
```