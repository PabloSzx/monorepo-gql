import type * as Types from "graphql-gen";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  humans: Array<Human>;
};

export type QueryHelloArgs = {
  a?: Maybe<Scalars["String"]>;
};

export type Human = {
  __typename?: "Human";
  id: Scalars["ID"];
  name: Scalars["String"];
  number?: Maybe<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  news: Scalars["String"];
};

export type HelloGatewayQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HelloGatewayQuery = { __typename?: "Query" } & Pick<Types.Query, "hello"> & {
    humans: Array<{ __typename?: "Human" } & Pick<Types.Human, "id" | "name">>;
  };

export const HelloGatewayDocument: DocumentNode<HelloGatewayQuery, HelloGatewayQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HelloGateway" },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "hello" }, arguments: [], directives: [] },
          {
            kind: "Field",
            name: { kind: "Name", value: "humans" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] },
                { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }
              ]
            }
          }
        ]
      }
    }
  ]
};
