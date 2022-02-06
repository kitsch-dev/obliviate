const statuses = require('statuses')
const isEmpty = require('lodash/isEmpty')
const melon = require('../../lib/melon')

module.exports = async (request, response) => {
  try {
    const { data } = await melon.get('/chart/hourly/hourlyChartList.json', {
      params: {
        startIndex: 1,
        pageSize: 100,
        isRecom: 'N',
        v: '4.0'
      }
    })

    if (isEmpty(data.response)) {
      return response.status(404).json({
        message: statuses(404)
      })
    }

    const { CHARTLIST: chartList, RANKHOUR: rankHour, RANKDAY: rankDay } = data.response
    return response.json({
      rankDay,
      rankHour,
      chartList: chartList.map(({
        SONGID: songId,
        SONGNAME: songName,
        CURRANK: curRank,
        PASTRANK: pastRank,
        RANKGAP: rankGap,
        RANKTYPE: rankType,
        ARTISTLIST: artistList,
        ALBUMID: albumId,
        ALBUMNAME: albumName,
        ALBUMIMG: albumImg
      }) => {
        return {
          songId,
          songName,
          curRank,
          pastRank,
          rankGap,
          rankType,
          artistList: artistList.map(({
            ARTISTID: artistId,
            ARTISTNAME: artistName
          }) => {
            return {
              artistId,
              artistName
            }
          }),
          albumId,
          albumName,
          albumImg
        }
      })
    })
  } catch ({ message }) {
    return response.status(404).json({
      message: statuses(404)
    })
  }
}
