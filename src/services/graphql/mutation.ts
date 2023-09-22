import { gql } from "@apollo/client";

export const createAuthor = gql`
  mutation createAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;
