const axios = require('axios')

module.exports = {
  cafe: axios.create({
    baseURL: 'https://m.cafe.daum.net'
  })
}
