const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet,statistics'
  }
})
