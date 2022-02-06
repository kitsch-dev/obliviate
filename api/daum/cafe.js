const cheerio = require('cheerio')
const statuses = require('statuses')
const daum = require('../../lib/daum')

function parseValue(value) {
  return parseInt(value.replace(/,/g, ''))
}

module.exports = async (request, response) => {
  try {
    const id = request.query.id || 'WJSNcosmic'
    const { data } = await daum.cafe.get(`/${id}/_rec`)

    const $ = cheerio.load(data)
    const count = $('span.member_number').text()

    return response.json({ id, count: parseValue(count) })
  } catch ({ message }) {
    return response.status(404).json({
      message: statuses(404)
    })
  }
}
