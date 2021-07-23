const isPlainObject = require('lodash/isPlainObject')
const store = require('../store')
const cloud = require('../cloud')

async function performHourly({ id, binId }) {
  const { data: { hourly } } = await store.get(`/b/${binId}`)
  const { data } = await cloud.get('/melon/chart')
  const { rankDay, rankHour, chartList } = data
  const song = chartList.find(({ songId }) => songId === id)
  const { curRank, pastRank, rankGap, rankType } = song || {}
  const date = `${rankDay}.${rankHour}`

  if (isPlainObject(hourly)) {
    await store.put(`/b/${binId}`, {
      hourly: {
        ...hourly,
        [date]: [
          curRank  || '-',
          pastRank || '-',
          rankGap  || '-',
          rankType || 'Out'
        ]
      }
    })
  }
}

async function performDaily({ id, binId }) {
  const { data: { daily } } = await store.get(`/b/${binId}`)
  const { data } = await cloud.get('/melon/song', { params: { id } })
  const { yesterChartInfo: { rank, inChartYn }, stReport: { date, listnerCnt } } = data

  if (isPlainObject(daily)) {
    await store.put(`/b/${binId}`, {
      daily: {
        ...daily,
        [date]: [
          rank,
          inChartYn,
          listnerCnt,
        ]
      }
    })
  }
}

async function perform({ id, binId, type }) {
  type === 'hourly'
    ? (await performHourly({ id, binId }))
    : (await performDaily({ id, binId }))
}

module.exports = { perform }
