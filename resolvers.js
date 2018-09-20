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
        // console.log('*** data res ****', res)
        return res
      })
    },

    weatherInfo: (parent, query) => {
      const data = Promise.all(query.ids.map(id => {
        return axios.get('https://qa.foreflight.com/weather/report/' + id)
        .then(res => {
          return res.data.report
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
    }
  },

  WeatherInfo: {
    currentTempF: (parent) => {
      const tempF = (parent.conditions.tempC * (9/5)) + 32
      return tempF
    },

    relativeHumidity: (parent) => {
      return parent.conditions.relativeHumidity
    },
// need to clarify this one
    summaryOfCloudCoverage: (parent) => {
      return parent.conditions.cloudLayers
    },
// need to clarify this one
    visibility: (parent) => {
      return parent.conditions.visibility.distanceSm
    },

    windSpeed: (parent) => {
      // 1 knot = 1.15078 mph
      const windMPH = Math.round(parent.conditions.wind.speedKts * .868976)
      return windMPH.toFixed(0)
    },

    cardinalWindDirection: (parent) => {
      const direction = Math.floor((parent.conditions.wind.direction / 22.5) + 0.5)
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'] 
      return directions[(direction % 16)]
    },

    windDirection: (parent) => {
      return parent.conditions.wind.direction
    },

    weatherPeriod1: (parent) => {
      console.log('*** period 1 ****', parent.report.conditions)
    }   
  }
}

module.exports = resolvers