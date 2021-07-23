const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://lumo.vercel.app',
  headers: {
    'X-Master-Key': process.env.JSONBIN_TOKEN
  }
})
