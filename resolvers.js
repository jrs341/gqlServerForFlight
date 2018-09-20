const axios = require('axios')

const resolvers = {
  Query: {
    airportInfo: (parent, query) => {
      const data = Promise.all(query.ids.map(id => {
        return axios.get('https://qa.foreflight.com/airports/' + id)
          .then(res => {
            return res.data.airport.results
          })
        }))
      return data.then(res => {
        return res
      })
    }
  },

  AirPortInfo: {
    icao: (parent) => {
      return parent.icao
    },

    faaCode: (parent) => {
      return parent.faaCode
    },

    runways: (parent) => {
      return parent.runways.map(runway => {
        return runway.ident
      })
    },

    location: (parent) => {
      const location = parent.latitude + ' ' + parent.longitude
      return location
    },

    airPortWeatherInfo: (parent) => {
      const weather = axios.get('https://qa.foreflight.com/weather/report/' + parent.icao)
        .then(res => {
          return res.data.report
      })
      return weather
    }
  },

  WeatherInfo: {
    current: (parent) => {
      return parent.conditions
    },

    forecast: (parent) => {
      const forecast = parent.forecast
      forecast.mos = parent.mos
      return forecast
    }
  },

  Weather: {
    cardinalWindDirection: (parent) => {
      const direction = Math.floor((parent.wind.direction / 22.5) + 0.5)
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'] 
      return directions[(direction % 16)]
    },

    currentTempF: (parent) => {
        return Math.round((parent.tempC * (9/5)) + 32).toFixed(0)
    },

    relativeHumidity: (parent) => {
      return parent.relativeHumidity
    },

    summaryOfCloudCoverage: (parent) => {
      let cloudCoverage = ''
      const coverage = ['ovc', 'bkn', 'few', 'sct']
      for (let i = 0; i < coverage.length; i++) {
        for (let j = 0; j < parent.cloudLayers.length; j++) {
          if (coverage[i] == parent.cloudLayers[j].coverage) {
            cloudCoverage = parent.cloudLayers[j]
            return cloudCoverage.coverage + ' at ' + cloudCoverage.altitudeFt + 'ft'
          }
        }
      }
      if (cloudCoverage == '') {
        return 'nil'
      }
    },
// since there is no temp in the forcast I am using the mos data to determine the lowest min 
  // and the highest max in the second and third forcast periods
    tempMinF: (parent) => {
      const periodStart = new Date(Date.parse(parent.period.dateStart)).getTime()
      const periodEnd = new Date(Date.parse(parent.period.dateEnd)).getTime()
      const minTemps = [] 
      parent.mos.forecast.conditions.map(condition => {
        const mosPeriodStart = new Date(Date.parse(condition.period.dateStart)).getTime()
        const mosPeriodEnd = new Date(Date.parse(condition.period.dateEnd)).getTime()
        if (mosPeriodStart >= periodStart && periodEnd <= mosPeriodEnd) {
          minTemps.push(Math.floor((condition.tempMinC * (9/5)) + 32).toFixed(0))
        } else {
          minTemps.push(1000)
        }
      })
      return Math.min.apply(null, minTemps)
    },

    tempMaxF: (parent) => {
      const periodStart = new Date(Date.parse(parent.period.dateStart)).getTime()
      const periodEnd = new Date(Date.parse(parent.period.dateEnd)).getTime()
      const maxTemps = [] 
      parent.mos.forecast.conditions.map(condition => {
        const mosPeriodStart = new Date(Date.parse(condition.period.dateStart)).getTime()
        const mosPeriodEnd = new Date(Date.parse(condition.period.dateEnd)).getTime()
        if (mosPeriodStart >= periodStart && periodEnd <= mosPeriodEnd) {
          maxTemps.push(Math.round((condition.tempMaxC * (9/5)) + 32).toFixed(0))
        } else {
          maxTemps.push(-1000)
        }
      })
      return Math.max.apply(null, maxTemps)
    },

    timeOffSet: (parent) => {
      const today = new Date()
      const dateStart = new Date(Date.parse(parent.period.dateStart))
      const offset = Math.abs(today.getTime() - dateStart.getTime())
      const hours = Math.floor((offset/(1000*60*60))%24).toFixed(0)
      const minutes = ((offset/(1000*60))%60).toFixed(0)
      const hh = hours < 10
        ? '0' + hours
        : hours
      const mm = minutes < 10
        ? '0' + minutes
        : minutes
      const time = hh + ':' + mm
      return time
    },
// need to clarify this one
    visibility: (parent) => {
      return parent.visibility.distanceSm
    },

    weatherPeriod1: (parent) => {
      const weatherPeriod1 = parent.conditions[1]
      weatherPeriod1.mos = parent.mos
      return weatherPeriod1
    },

    weatherPeriod2: (parent) => {
      const weatherPeriod2 = parent.conditions[2]
      weatherPeriod2.mos = parent.mos
      return weatherPeriod2
    },
     
    windDirectionTrueN: (parent) => {
      if (parent.wind.variable) {
        return 'variable'
      } else {
        return parent.wind.direction
      }
    },

    windSpeed: (parent) => {
      // 1 knot = 1.15078 mph
      return Math.round(parent.wind.speedKts * .868976).toFixed(0)
    }
  }
}

module.exports = resolvers