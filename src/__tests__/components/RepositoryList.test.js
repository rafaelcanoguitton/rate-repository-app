import React from "react";
import { render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      // test that ensures that the RepositoryListContainer component renders the repositories' name, description, language, forks count, stargazers count, rating average, and review count correctly.
      const { debug, getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      const valueToStat = (value) => {
        if (value > 1000) {
          value = Math.round(value / 1000) + "k";
        }
        return value;
      };
      debug();
      repositories.edges.forEach(({ node }, index) => {
        expect(getAllByTestId("fullName")[index]).toHaveTextContent(
          node.fullName
        );
        expect(getAllByTestId("description")[index]).toHaveTextContent(
          node.description
        );
        expect(getAllByTestId("language")[index]).toHaveTextContent(
          node.language
        );
        expect(getAllByTestId("Forks")[index]).toHaveTextContent(
          valueToStat(node.forksCount).toString()
        );
        expect(getAllByTestId("Stars")[index]).toHaveTextContent(
          valueToStat(node.stargazersCount).toString()
        );
        expect(getAllByTestId("Rating")[index]).toHaveTextContent(
          valueToStat(node.ratingAverage).toString()
        );
        expect(getAllByTestId("Reviews")[index]).toHaveTextContent(
          valueToStat(node.reviewCount).toString()
        );
      });
    });
  });
});
