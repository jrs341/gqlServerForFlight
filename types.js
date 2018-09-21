const { gql } = require('apollo-server')

const typeDefs = gql`

  type Query {
    airportInfo(ids:[String]): [AirPortInfo]
  }

  type AirPortInfo {
    airportWeatherInfo: WeatherInfo
    faaCode: String
    icao: String
    location: Location
    name: String
    runways: [String] 
  }

  type Location {
    latitude: String
    longitude: String
  }

  type WeatherInfo {
    current: Weather
    forecast: Weather
  }

  type Weather {
    cardinalWindDirection: String
    currentTempF: String
    tempMinF: String
    tempMaxF: String
    forecast: Weather
    relativeHumidity: String
    summaryOfCloudCoverage: String
    timeOffSet: String
    visibility: String
    weatherPeriod1: Weather
    weatherPeriod2: Weather
    windDirectionTrueN: String
    windSpeedMPH: String
  }
`;

module.exports = typeDefs