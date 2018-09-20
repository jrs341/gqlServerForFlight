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
    current: Weather
    forecast: Weather
    mos: Weather
    
  }

  type Weather {
    cardinalWindDirection: String
    conditions: [Weather]
    currentTempF: String
    forecast: Weather
    relativeHumidity: String
    summaryOfCloudCoverage: String
    visibility: String
    weatherPeriod1: Weather
    weatherPeriod2: Weather
    windDirection: String
    windSpeed: String
  }
`;

module.exports = typeDefs