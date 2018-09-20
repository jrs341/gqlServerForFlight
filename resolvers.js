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

    // weatherInfo: (parent, query) => {
    //   const data = Promise.all(query.ids.map(id => {
    //     return axios.get('https://qa.foreflight.com/weather/report/' + id)
    //     .then(res => {
    //       return res.data.report
    //     })
    //   }))
    //   return data.then(res => {
    //     return res
    //   })
    // }
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
      return parent.forecast
    },

    mos: (parent) => {
      return parent.mos
    }
  },

  Weather: {
    cardinalWindDirection: (parent) => {
      const direction = Math.floor((parent.wind.direction / 22.5) + 0.5)
      const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'] 
      return directions[(direction % 16)]
    },

    conditions: (parent) => {
      return parent.conditions
    },

    currentTempF: (parent) => {
        return Math.round((parent.tempC * (9/5)) + 32).toFixed(0)
    },

    forecast: (parent) => {
      return parent.forecast
    },

    relativeHumidity: (parent) => {
      return parent.relativeHumidity
    },
// need to clarify this one
    summaryOfCloudCoverage: (parent) => {
      // return parent.cloudLayers
      return parent.text
    },
// need to clarify this one
    visibility: (parent) => {
      return parent.visibility.distanceSm
    },

    weatherPeriod1: (parent) => {
      return parent.conditions[1]
    },

    weatherPeriod2: (parent) => {
      return parent.conditions[2]
    },
     
    windDirection: (parent) => {
      console.log('** parent **', parent.wind)
      // if(parent.hasOwnProperty('conditions')){
      //   if (parent.conditions.wind.variable){
      //     return 'variable'
      //   } else {
      //     return parent.conditions.wind.direction
      //   }
      // } else {
        if (parent.wind.variable) {
          return 'variable'
        } else {
          return parent.wind.direction
        }
      // }
    },

    windSpeed: (parent) => {
      // 1 knot = 1.15078 mph
      // if (parent.hasOwnProperty('conditions')){
      //   return Math.round(parent.conditions.wind.speedKts * .868976).toFixed(0)
      // } else {
        return Math.round(parent.wind.speedKts * .868976).toFixed(0)
      // } 
    }
  }
}

module.exports = resolvers