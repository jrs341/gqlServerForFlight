const { gql } = require('apollo-server')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

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
    allData: Weather
    current: Weather
    forecast: Weather
    mos: Weather
  }

  type Weather {
    cardinalWindDirection: String
    conditions: [Weather]
    currentTempF: String
    tempMinF: String
    tempMaxF: String
    forecast: Weather
    mosType: Weather
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