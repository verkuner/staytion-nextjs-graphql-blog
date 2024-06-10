
import { Int } from "graphql-request/alpha/schema/scalars";

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
            content: Text
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