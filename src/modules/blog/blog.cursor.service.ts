import { gql, GraphQLClient } from "graphql-request";
import { IBlogData } from "./blog.types"
import {countSearchBlogs, countBlogs} from "./blog.service"

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

// as _similar operation is case sensitive, using _ilike instead in this function.
export const getCursorPageBlogs = async (search: string = "", first: number = 5, after: string = "") => {

  let condition = `first: ${first}`;

  if (after) {
    condition = condition + `, after: "${after}"`;
  }

  if (search) {
    const fullSearch = '%' + search.trim() + '%';
    condition = condition + `, where: {
      _or: [
        {content: {_ilike: "${fullSearch}"} },
        {title: {_ilike: "${fullSearch}"} }
      ]
    }`;

  }

  condition = condition + `, order_by: {views: desc}`;

  const queryBlog = gql`
    query cursorQuery {
    blog_connection(${ condition }) {
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

  const data = await graphQLClientRelay.request<IBlogData>(queryBlog)

  const searchTotal = (queryBlog) ? await countSearchBlogs(search) : await countBlogs();

  data.blog_connection.totalCount = searchTotal;

  return data.blog_connection;
}


export async function getSinglePost(slug : string) {
  const queryBlog = gql`
    query cursorQuery {
    blog_connection(id: ${ slug }} ) {
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

  const data = await graphQLClientRelay.request<IBlogData>(queryBlog)
  return data.blog_connection.edges[0];
}


