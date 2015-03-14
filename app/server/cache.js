var _ = require('lodash')

class Cache {
  constructor() {
    this.cache = {}
    this.previousPeriod = null
    this.durationSecond = process.env['CACHE_DURATION_SECOND'] || 600
  }

  expire() {
    this.cache = {}
  }

  set(object) {
    this.cache = object
    this.previousPeriod = Date.now()
  }

  get() {
    return this.cache
  }

  hasExpired() {
    if (_.isNull(this.previousPeriod)) {
      return true
    } else {
      return (Date.now() - this.previousPeriod) / 1000 > this.durationSecond
    }
  }
}

module.exports = Cache
