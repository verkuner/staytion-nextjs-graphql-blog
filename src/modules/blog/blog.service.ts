import { gql, GraphQLClient } from "graphql-request";
import { IBlogData } from "./blog.types";

const _ENDPOINT_ = 'https://native-polliwog-16.hasura.app/v1beta1/relay'
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