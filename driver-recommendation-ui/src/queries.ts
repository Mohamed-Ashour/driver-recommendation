import { gql } from "@apollo/client";

export const nearDriversQuery = gql`
  query NearDrivers($longitude: Float!, $latitude: Float!) {
    nearDrivers(longitude: $longitude, latitude: $latitude) {
      id
      name
      telephone
      estimateTime
      location {
        latitude
        longitude
      }
    }
  }
`;
