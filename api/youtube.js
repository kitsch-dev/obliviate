const statuses = require('statuses')
const youtube = require('../lib/youtube')

module.exports = async (request, response) => {
  try {
    const { id, key } = request.query
    const { data } = await youtube.get('/videos', { params: { id, key } })

    return response.json(data.items.map(({ id, snippet, statistics }) => {
      const { title, channelTitle } = snippet
      const { viewCount, likeCount } = statistics

      return {
        id,
        title,
        channelTitle,
        viewCount: Number(viewCount),
        likeCount: Number(likeCount)
      }
    }))
  } catch ({ message }) {
    return response.status(404).json({
      message: statuses(404)
    })
  }
}
