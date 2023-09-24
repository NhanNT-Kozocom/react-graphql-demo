import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
      age
    }
  }
`;

export const GET_AUTHOR = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      name
      age
    }
  }
`;

export const GET_BOOKS = gql`
  query getBooks {
    books {
      id
      name
      genre
    }
  }
`;
