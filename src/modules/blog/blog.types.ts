
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
    IBlog
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
  node: IBlog
}

export interface IBlogConnection {
  edges: [
    {
      cursor: string
      node: IBlog
    }
  ],
  pageInfo: {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    endCursor: string,
    startCursor: string
  }

}

export interface IBlogData {
  blog_connection: IBlogConnection
}