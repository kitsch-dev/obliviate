const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://m2.melon.com',
  params: {
    v: '5.0',
    cpId: 'AS40',
    cpKey: '14LNC3',
    resolution: '3'
  }
})
