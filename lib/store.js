const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://api.jsonbin.io',
  headers: {
    'X-Master-Key': process.env.JSONBIN_TOKEN
  }
})
