
import { Int } from "graphql-request/alpha/schema/scalars";

export interface IBlog {
    id: Int
    views: string
    author: string
    title: string
    content: string
    slug: string
    created_at: Date
    updated_at: Date
}

export interface IBlogQueryReturn {
  blog: [
    {
    id: Int
    views: string
    author: string
    title: string
    content: string
    slug: string
    created_at: Date
    updated_at: Date
    }
  ]
}

export interface IBlogAggregate {
  blog_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export interface IBlogNodes {
    cursor: string
    node: {
      id: Int
      views: string
      author: string
      title: string
      content: Text
      created_at: Date
      updated_at: Date
    }
  }
  
  export interface IBlogData {
    blog_connection: {
      edges: [
        {
          cursor: string
          node: {
            id: Int
            views: string
            author: string
            title: string
            content: string
            created_at: Date
            updated_at: Date
            slug: string
          }
        }
      ],
      pageInfo: {
        hasNextPage: boolean,
        hasPreviousPage: boolean
      }
    }
  }