'use client'

import { useEffect, useState } from "react";
import utilStyles from "../styles/utils.module.css";
import Link from 'next/link';
import Date from "../../libs/date-formatter";
import {GetBlogs} from "../../modules/blog/blog.service"
import {IBlogData, IBlogNodes} from "../../modules/blog/blog.types"

type Props = {
    data: IBlogData;
};
const SearchComponent: React.FC<Props> = ({data}) => {

    const [posts, setPosts] = useState<IBlogNodes[]>()
    const [result, setResult] = useState<IBlogNodes[]>()
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