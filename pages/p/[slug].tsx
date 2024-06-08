import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import { BlogProps } from "../../components/Blog"
import { useRouter } from 'next/router'

import Head from "next/head";
import Layout from "../../components/LayoutNew";
import { BlogEdges, BlogData, GetBlogs, GetBlogsById, InsertBlogViews } from "../../graphql/BlogFetch";
import Date from "../../components/DateFormatter";
import utilStyles from "../../styles/utils.module.css";

import { geolocation } from '@vercel/edge';


// const Post: React.FC<BlogProps> = (props) => {
//   let title = props.title
//   if (!props.published) {
//     title = `${title} (Draft)`
//   }

//   return (
//     <Layout>
//       <div>
//         <h2>{title}</h2>
//         <p>By {props?.author || "Unknown author"}</p>
//         <ReactMarkdown children={props.content} />
//       </div>
//       <style jsx>{`
//         .page {
//           background: white;
//           padding: 2rem;
//         }

//         .actions {
//           margin-top: 2rem;
//         }

//         button {
//           background: #ececec;
//           border: 0;
//           border-radius: 0.125rem;
//           padding: 1rem 2rem;
//         }

//         button + button {
//           margin-left: 1rem;
//         }
//       `}</style>
//     </Layout>
//   )
// }




const PostDetail = ({ post }: any) => {

  const router = useRouter()

  console.log(post)

  // if (router.isFallback) {
  //   return <Loader />
  // }

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