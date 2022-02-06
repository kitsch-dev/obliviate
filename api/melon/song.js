const statuses = require('statuses')
const melon = require('../../lib/melon')

module.exports = async (request, response) => {
  try {
    const songId = request.query.id
    const { data } = await melon.get('/song/detailInfo.json', { params: { songId } })

    const {
      SONGID: id,
      SONGNAME: name,
      ALBUMINFO: albumInfo,
      ARTISTLIST: artistList,
      YESTERCHARTINFO: yesterChartInfo,
      RECORDINFO: recordInfo,
      STREPORT: stReport
    } = data.response || {}

    const {
      ALBUMID: albumId,
      ALBUMNAME: albumName,
      ISSUEDATE: issueDate,
      ALBUMIMG: albumImg,
      ALBUMIMGLARGE: albumImgLarge,
      LIKECNT: likeCnt
    } = albumInfo || {}

    const {
      RANK: rank,
      INCHARTYN: inChartYn,
      FIRSTRANKINFO: firstRankInfo
    } = yesterChartInfo || {}

    const {
      DATE: date,
      MALE: male,
      FEMALE: female,
      LISTNERCNT: listnerCnt
    } = stReport || {}

    return response.json({
      id,
      name,
      albumInfo: {
        albumId,
        albumName,
        albumImg,
        albumImgLarge,
        issueDate,
        likeCnt: Number(likeCnt)
      },
      artistList: artistList.map(({
        ARTISTID: artistId,
        ARTISTNAME: artistName
      }) => {
        return {
          artistId,
          artistName
        }
      }),
      yesterChartInfo: {
        firstRankInfo,
        inChartYn,
        rank
      },
      stReport: {
        listnerCnt: Number(listnerCnt),
        female,
        male,
        date
      }
    })
  } catch ({ message }) {
    return response.status(404).json({
      message: statuses(404)
    })
  }
}
