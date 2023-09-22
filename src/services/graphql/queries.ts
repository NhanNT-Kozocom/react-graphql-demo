import { gql } from "@apollo/client";

export const getAuthors = gql`
  query getAuthors {
    authors {
      id
      name
      age
    }
  }
`;

export const getBooks = gql`
  query getBooks {
    books {
      id
      name
      genre
    }
  }
`;
