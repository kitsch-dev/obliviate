const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://id-160225.vercel.app/api'
})
