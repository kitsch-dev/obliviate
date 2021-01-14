const dayjs = require('dayjs')
const utcPlugin = require('dayjs/plugin/utc')
const timezonePlugin = require('dayjs/plugin/timezone')

dayjs.extend(utcPlugin)
dayjs.extend(timezonePlugin)
dayjs.tz.setDefault('Asia/Seoul')

module.exports = dayjs
