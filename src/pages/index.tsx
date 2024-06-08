/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import Layout, {siteTitle} from "../components/layout"
import {GetBlogs} from "../modules/blog.service"
import {IBlogData} from "../modules/blog.types"

import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

import Router from "next/router";
import Date from "../libs/date-formatter";

export default function Home() {
  const [allPostsData, setAllPostsData] = useState<IBlogData>();

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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <div className={utilStyles.search}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} /> <button>Search</button>
        </div>

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


