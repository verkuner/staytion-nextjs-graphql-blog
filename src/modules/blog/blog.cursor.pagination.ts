
import { Int } from "graphql-request/alpha/schema/scalars";

type PageInfo = {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }
  
  type Blog = {
    id: Int
    views: string
    author: string
    title: string
    content: string
    slug: string
    created_at: Date
    updated_at: Date
  }
  
  type BlogEdge = {
    node: Blog
    cursor: String
  }
  
  type BlogConnection= {
    totalCount: Int
    edges: [BlogEdge]
    pageInfo: PageInfo
  }
  
  type Query  = {
    blogCursorQuery(first: Int, after: String, last: Int, before: String): BlogConnection
  }

  