
export const typeDefs = `
  type Location {
    longitude: Float
    latitude: Float
  }

  type Driver {
    id: Int
    name: String
    telephone: String
    estimateTime: Int
    location: Location
  },
  
  type Query {
    nearDrivers(longitude: Float!, latitude: Float!): [Driver]
  }
`
