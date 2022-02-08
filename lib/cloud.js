const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://kpopfans.vercel.app/api'
})
