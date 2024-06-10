import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Head from "next/head";
import Layout from "@/src/components/blog/layout";
import {GetBlogsById, InsertBlogViews } from "@/src/modules/blog/blog.service";
import { IBlogNodes, IBlogData } from "@/src/modules/blog/blog.types";
import Date from "@/src/libs/date-formatter";
import utilStyles from "@/src/styles/blog/utils.module.css";

const PostDetail = ({ post }: any) => {
  return (
    <Layout home={false}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.created_at} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}
export default PostDetail;


// export async function getStaticProps ({ params } : any) {
//   const data = await GetBlogsById(params.slug)
//   console.log(data)
//   return {
//     props: {
//       post: data.blog_connection.edges[0].node
//     }
//   }
// }

// export async function getStaticPaths () {
//   const posts = await GetBlogs()
//   const edges = posts.blog_connection.edges;
//   return {
//     paths: edges.map(({ node: { slug } }) => ({ params: { slug } })),
//     fallback: true
//   }
// }

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const blog = {
//     id: "1",
//     title: "Prisma is the perfect ORM for Next.js",
//     content: "Code Hands on Blog example ",
//     published: false,
//     author: "Lewis YS"
//   }

//   const data = await GetBlogsById(params)
//   return {
//     props: {
//       post: data
//     }
//   }

//   // return {
//   //   post: blog,
//   // }
// }


export async function getServerSideProps({ req, params } : any) {
  const forwarded = req.headers["x-forwarded-for"]
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress
  

  const data = await GetBlogsById(params.slug);

  const post = data.blog_connection.edges[0].node;

  //const { city } = geolocation(req);

  const views = await InsertBlogViews(post.slug, ip, ip)

  return {
    props: {
      post: data.blog_connection.edges[0].node,
      ip,
    },
  }
}