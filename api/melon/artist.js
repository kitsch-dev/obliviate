const statuses = require('statuses')
const melon = require('../../lib/melon')

module.exports = async (request, response) => {
  try {
    const artistId = request.query.id
    const { data } = await melon.get('/artist/basicInfo.json', { params: { artistId } })
    const { ARTISTID: id, ARTISTNAME: name, FANCNT: count } = data.response || {}
    return response.json({ id, name, count: Number(count) })
  } catch ({ message }) {
    return response.status(404).json({
      message: statuses(404)
    })
  }
}
