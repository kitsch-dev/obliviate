const sortBy = require('lodash/sortBy')
const store = require('../store')
const cloud = require('../cloud')

async function perform({ id, binId }) {
  const key = process.env.YOUTUBE_API_KEY
  const { data } = await store.get(`/b/${binId}`)
  const { data: videos } = await cloud.get('/youtube', { params: { id, key } })
  await store.put(`/b/${binId}`, sortBy(videos, ({ viewCount }) => -viewCount))
}

module.exports = { perform }
