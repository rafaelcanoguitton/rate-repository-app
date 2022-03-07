import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!,$searchKeyword: String!,$first: Int!, $after: String) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
        cursor
      }
      pageInfo{
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;
export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
export const GET_REPO = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      description
      language
      ownerAvatarUrl
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
