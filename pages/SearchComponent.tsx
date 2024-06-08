'use client'

import { useEffect, useState } from "react";
import utilStyles from "../styles/utils.module.css";
import Link from 'next/link';
import Date from "../components/DateFormatter";
import {BlogData, BlogEdges, GetBlogs} from "../graphql/BlogFetch"
import { BlogProps } from "@/components/Blog";
import { Any } from "graphql-request/alpha/schema/scalars";
// export const getStaticProps: GetStaticProps = async () => {
//     const feed = [
//       {
//         id: "1",
//         title: "Prisma is the perfect ORM for Next.js",
//         content: "Code Hands on example",
//         published: false,
//         author: "Lewis Liu",
//       },
//     ]
  
//     console.log(feed)
//     const feedBlog = await GetBlogs()
//     console.log(feedBlog.blog_connection.edges)
  
//     console.log ('execute success')
  
//     return { 
      
//       props: feedBlog.blog_connection, 
//       revalidate: 10 
//     }
//   }


type Props = {
    data: BlogData;
};
const SearchComponent: React.FC<Props> = ({data}) => {

    const [posts, setPosts] = useState<BlogEdges[]>()
    const [result, setResult] = useState<BlogEdges[]>()
    const [search, setSearch] = useState("")

    // useEffect(() => {
    //     console.log("search => ", search)
    //     setResult(() => {
    //         return posts.filter((post : any) => post.title.toLowerCase().includes(search.toLowerCase()))
    //     })
    // }, [search])

    // useEffect(() => {
    //     console.log("search => ", search)
    //     setResult(() => {
    //         return posts.filter((post : any) => post.title.toLowerCase().includes(search.toLowerCase()))
    //     })
    // }, [search])

    console.log(result)

    return (
        <>
            <h1>Search</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
                {result && result.map((post : any) => (
                    <li className={utilStyles.listItem} key={post.node.id}>
                        <Link href={`/posts/{post.node.id}`}>{post.node.title}</Link>
                        <br />
                        <small>By {post.node.author}</small>
                        <small className={utilStyles.lightText}>
                            <Date dateString={post.node.create_at} />
                        </small>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SearchComponent;