/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import { GetStaticProps } from "next"
import Layout, {siteTitle} from "../components/LayoutNew"
import { BlogProps } from "../components/Blog"
import Post from "../components/Blog"
import {BlogEdges, BlogData, GetBlogs} from "../graphql/BlogFetch"

import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
//import { getSortedPostsData } from '../lib/posts';

import Router from "next/router";
import ReactMarkdown from "react-markdown";

import Link from 'next/link';
import Date from "../components/DateFormatter";


// export const getStaticProps: GetStaticProps = async () => {
//   const feed = [
//     {
//       id: "1",
//       title: "Prisma is the perfect ORM for Next.js",
//       content: "Code Hands on example",
//       published: false,
//       author: "Lewis Liu",
//     },
//   ]

//   console.log(feed)
//   const feedBlog = await GetBlogs()
//   console.log(feedBlog.blog_connection.edges)

//   console.log ('execute success')

//   return { 
    
//     props: feedBlog.blog_connection, 
//     revalidate: 10 
//   }
// }



// type Props = GetStaticProps

// const Blog: React.FC<Props> = (props) => {
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Blog List</h1>
//         <main>
//           {props.edges.map((post) => (
//             <div key={post.node.id} className="post">
//               <Post blog={post.node} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   )
// }

// export default Blog

// export async function getStaticProps() {
//   const allPostsData = GetBlogs();
//   return {
//     props: {
//       allPostsData,
//     }
//   };
// }



export default function Home() {
  const [allPostsData, setAllPostsData] = useState<BlogData>();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetBlogs();
      setAllPostsData(result);
      console.log(result);
    };
  
    fetchData();
  }, []);

  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p align='center'>A software developer who is trying Next.js for the first time.</p>
      </section> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        {/* <h2 className={utilStyles.headingLg}>Blog</h2> */}
        <div className={utilStyles.search}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} /> <button>Search</button>
        </div>

        {/* <SearchComponent data={allPostsData} /> */}
        <ul className={utilStyles.list}>
            {allPostsData && allPostsData.blog_connection.edges.map((post : any) => (
                <li className={utilStyles.listItem} key={post.node.slug} onClick={() => Router.push("/p/[id]", `/p/${post.node.slug}`)} >
                    <div><b>{post.node.title}</b></div>
                    <div>{post.node.content.substring(0,100)} ...</div>
                    <div>
                      <span>By {post.node.author}</span>&nbsp;&nbsp;
                      <span className={utilStyles.lightText}>
                          <Date dateString={post.node.created_at} />
                      </span>&nbsp;&nbsp;
                      <span>Views: {post.node.views}</span>
                    </div>

                </li>
            ))}
        </ul>

      </section>
    </Layout>
  );
}


