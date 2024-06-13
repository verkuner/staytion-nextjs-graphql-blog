import { gql, GraphQLClient } from "graphql-request";
import { IBlogData } from "./blog.types"

const _ENDPOINT_RELAY_ = 'https://native-polliwog-16.hasura.app/v1beta1/relay'
const _ENDPOINT_GQL_ = 'https://native-polliwog-16.hasura.app/v1/graphql'

const _X_HASURA_ADMIN_SECRET_ = 'Voqz7YduanquR0DUcjomaxzJZ68dIsbblSirb1OySmB3IXbw9LAZOWBkk9RNrmE8'

const graphQLClientRelay = new GraphQLClient(_ENDPOINT_RELAY_, {
    mode: `cors`,
    headers: {
        "content-type": `application/graphql`,
        "Cache-Control": `no-cache`,
        "x-hasura-admin-secret": _X_HASURA_ADMIN_SECRET_
    }
})

export const getCursorPageBlogs = async (first: number, after: string, last: number, before: string) => {
  const queryBlog = gql`
    query cursorQuery($first: Int, $after: String, $last: Int, $before: String) {
      blog_connection(first: $first, after: $after, last: $last, before: $before, order_by: {views: desc}, ) {
        edges {
          cursor
          node {
            author
            content
            created_at
            id
            slug
            title
            updated_at
            views
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `;

  const data = await graphQLClientRelay.request<IBlogData>(queryBlog,
      { 'first': first, 'after': after, 'last': last, 'before': before })
  return data.blog_connection;
}

