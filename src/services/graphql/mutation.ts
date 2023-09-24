import { gql } from "@apollo/client";

export const CREATE_AUTHOR = gql`
  mutation createAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthorMutation($id: String, $name: String, $age: Int) {
    updateAuthor(id: $id, name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation deleteAuthorMutation($id: String) {
    deleteAuthor(id: $id)
  }
`;
