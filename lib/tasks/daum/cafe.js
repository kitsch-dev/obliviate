const isPlainObject = require('lodash/isPlainObject')
const store = require('../../store')
const cloud = require('../../cloud')
const dayjs = require('../../dayjs')

async function perform({ id, binId }) {
  const { data } = await store.get(`/b/${binId}`)
  const { data: { count } } = await cloud.get(`/daum/cafe`, { params: { id } })

  if (isPlainObject(data[id])) {
    const date = dayjs.tz().format('YYYY.MM.DD')
    await store.put(`/b/${binId}`, {
      [id]: {
        ...data[id],
        [date]: count
      }
    })
  }
}

module.exports = { perform }
