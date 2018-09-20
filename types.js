const { gql } = require('apollo-server')

const typeDefs = gql`

  type Query {
    airportInfo(ids:[String]): [AirPortInfo]
  }

  type AirPortInfo {
    icao: String
    faaCode: String
    runways: [String]
    location: String
    airPortWeatherInfo: WeatherInfo
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
    windSpeed: String
  }
`;

module.exports = typeDefs