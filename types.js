const { gql } = require('apollo-server')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

const typeDefs = gql`

  type Query {
    airportInfo(ids:[String]): [AirPortInfo]
    weatherInfo(ids:[String]): [WeatherInfo]
    getTivoliRiverInfo: TivoliRiverInfo
  }

  type AirPortInfo {
    icao: String
    faaCode: String
    runways: [String]
    location: String
  }

  type WeatherInfo {
    currentTempF: String
    relativeHumidity: String
    summaryOfCloudCoverage: String
    visibility: String
    windSpeed: String
    windDirection: String
    cardinalWindDirection: String
    weatherPeriod1: WeatherInfo
  }

  type RiverInfo {
    date: String
    level: String
  }

  type TrendInfo {
    lastReading: RiverInfo
    sixHourDelta: String
    twelveHourDelta: String
    twentyFourHourDelta: String
    fortyEightHourDelta: String
  }

  type TivoliRiverInfo {
    data: [RiverInfo]
    trendInfo: TrendInfo
  }
`;

module.exports = typeDefs