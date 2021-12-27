//in this file we define the gql queries that we will use in our application
import { gql } from "@apollo/client";

const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export default GET_REPOSITORIES;