import { gql, GraphQLClient } from "graphql-request";
import { IBlogData, IBlog, IBlogQueryReturn, IBlogAggregate } from "./blog.types";

const _ENDPOINT_ = 'https://native-polliwog-16.hasura.app/v1beta1/relay'
const _ENDPOINT_GQL_ = 'https://native-polliwog-16.hasura.app/v1/graphql'

const _X_HASURA_ADMIN_SECRET_ = 'Voqz7YduanquR0DUcjomaxzJZ68dIsbblSirb1OySmB3IXbw9LAZOWBkk9RNrmE8'



const variables = {
  mode: `cors`,
  headers: {
    "content-type": `application/graphql`,
    "x-hasura-admin-secret": _X_HASURA_ADMIN_SECRET_
  }
}

const graphQLClient = new GraphQLClient(_ENDPOINT_, {
  mode: `cors`,
  headers: {
    "content-type": `application/graphql`,
    "Cache-Control": `no-cache`,
    "x-hasura-admin-secret": _X_HASURA_ADMIN_SECRET_
  }
})

const graphQLClientGQL = new GraphQLClient(_ENDPOINT_GQL_, {
  mode: `cors`,
  headers: {
    "content-type": `application/graphql`,
    "Cache-Control": `no-cache`,
    "x-hasura-admin-secret": _X_HASURA_ADMIN_SECRET_
  }
})

export const GetBlogs = async () => {
  const queryBlog = gql`
    query GetBlog {
      blog_connection { 
        edges {
          cursor
          node {
            author
            content
            created_at
            id
            title
            updated_at
            views
            slug
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }

  `
  const data = await graphQLClient.request<IBlogData>(queryBlog)
  return data
}

export const countBlogs = async () => {
  let queryBlog = gql`
    query CountBlog {
      blog_aggregate {
        aggregate {
          count(columns: author)
        }
      }
    }
  `;

  const data = await graphQLClientGQL.request<IBlogAggregate>(queryBlog)
  return data.blog_aggregate.aggregate.count;
}


// as _similar operation is case sensitive, using _ilike instead in this function.
export const countSearchBlogs = async (search: string) => {
  const queryBlog = gql`
      query pageBlogQuery($search: String) {
        blog_aggregate(where: {_or: [ {content: {_ilike: $search}}, {title: {_ilike: $search}}] }) {
          aggregate {
            count
          }
        }
      }
    `;
  const similarSearch = '%' + search.trim() + '%';
  const data = await graphQLClientGQL.request<IBlogAggregate>(queryBlog, {'search': similarSearch})
  return data.blog_aggregate.aggregate.count;
}


export const getPageBlogs = async (limit:Number, offset: Number) => {
  const queryBlog = gql`
    query pageBlogQuery($limit: Int, $offset: Int) {
      blog(limit: $limit, offset: $offset, order_by: {views: desc}) {
        author
        content
        id
        created_at
        slug
        title
        updated_at
        views
      }
    }
  `;

  const data = await graphQLClientGQL.request<IBlogQueryReturn>(queryBlog, {'limit':limit, 'offset':offset})
  return data.blog;
}

export const searchBlogs = async (search:String, limit:Number, offset: Number) => {
  search = '%' + search + '%'
  const queryBlog = gql`
    query pageBlogQuery($search: String, $limit: Int, $offset: Int) {
      blog(limit: $limit, offset: $offset, where: {content: {_similar: $search}}, order_by: {views: desc}) {
        author
        content
        id
        created_at
        slug
        title
        updated_at
        views
      }
    }
  `;
  const data = await graphQLClientGQL.request<IBlogQueryReturn>(queryBlog, {'search': search, 'limit':limit, 'offset':offset})
  return data.blog;
}

export const GetBlogsById = async (id: String) => {
  const queryBlog = gql`
    query GetBlog ($slug: Int!){
      blog_connection (where: {id: {_eq: $slug}})  {
        edges {
          node {
            author
            content
            created_at
            id
            title
            updated_at
            views
            slug
          }
        }
      }
    }
  `

  const slug = Number(id);
  const data = await graphQLClient.request<IBlogData>(queryBlog, { slug })
  return data
}

export const InsertBlogViews = async (blogId: String, ip: String, location?: String) => {

  const slug = Number(blogId);

  const queryBlog = gql`
    mutation InsertViews ($slug: Int!, $ip:String!, $location:String) {
      insert_blog_views_one(object: {IP: $ip, blog_id: $slug, location: $location} ) {
        IP
        blog_id
        id
        location
        created_at
      }
    }

  `
  const data = await graphQLClient.request<IBlogData>(queryBlog, { slug, ip, location })
  return data
}

export const loadSinglePostWithInsertViews = async (id : string, ip : string ) => {

  const data = await GetBlogsById(id);

  const post = data.blog_connection.edges[0];

  const views = await InsertBlogViews(id, ip, ip)

  return post;

}
