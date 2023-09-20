import { gql } from "@apollo/client";

export const getLocation = gql`
  query getLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;
