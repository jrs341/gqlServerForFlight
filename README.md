# gqlServerForFlight
graphQL server for forFlight code exercise
## Folder Structure
```
gqlServerForFlight/
  README.md
  node_modules/
  main.js
  package.json
  resolvers.js
  types.js
```
## Available Scripts

### `npm start`

Runs the app.<br>
Open [http://localhost:3010](http://localhost:3010) to view it in the browser.

## Notes

To avoid installing and running the app locally you can also view it at the following location [https://gql-server-for-flight.herokuapp.com/](https://gql-server-for-flight.herokuapp.com/)
- Copy and paste the following query into left side of the screen on either the local or deployed version.
- Enter the airport icao identifiers into the array following the ids:, you must use "" around the icao id.
```
query airports{
  airportInfo(ids:["kaus", "kvct"]){
    icao
    runways
    location{
      latitude
      longitude
    }
    name
    airportWeatherInfo{
      current{
      currentTempF
      relativeHumidity
      summaryOfCloudCoverage
      visibility
      windSpeedMPH
      cardinalWindDirection
    	}
    	forecast{
      	weatherPeriod1{
          windSpeedMPH
          windDirectionTrueN
          timeOffSet
          tempMinF
          tempMaxF
        }
      	weatherPeriod2{
        	windSpeedMPH
          windDirectionTrueN
          timeOffSet
          tempMinF
          tempMaxF
      	}
      }
    }
  }
}
```
