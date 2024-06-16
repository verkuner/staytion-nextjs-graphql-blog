import Head from "next/head";
import Link from "next/link";

import SiteHeader from "@/src/components/blog/siteheader";
import SiteFooter from "@/src/components/blog/sitefooter";
import FeaturedImage from "@/src/components/blog/featuredimage";
import { getCursorPageBlogs } from "@/src/modules/blog/blog.cursor.service";

import { countBlogs, countSearchBlogs } from '@/src/modules/blog/blog.service';
import Search from '@/src/components/layout/searchbar';
import { Suspense } from 'react';
import BlogCursorTable from "@/src/components/post/table-cursor"

import Date from "@/src/libs/date-formatter";
import { BlogCursorTableSkeleton } from '@/src/components/home/skeletons';

import LoadMore from "@/src/components/blog/loadmore";
import { useState } from "react";
import { IBlogData, IBlogConnection } from "@/src/modules/blog/blog.types";
import Layout from "../layout"

import { unstable_noStore as noStore } from 'next/cache';

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'


export async function getServerSideProps(context) {

  context.res.setHeader('Cache-Control', 'no-store');

  const { page, query } = context.query;
  const count = (query) ? await countSearchBlogs(query) : await countBlogs();

  const allPosts = await getCursorPageBlogs(query, 5);

  return {
    props: {
      allPosts: allPosts,
      total: count,
      query: query ? query : "",
    },
  }
}


export default function BlogHome({ allPosts, total, query }) {

  const [posts, setPosts] = useState(allPosts);

  noStore();
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
      <div className="container text-center mx-auto text-2xl lg:max-w-5xl post-list mt-4">
            Total (<b>{total}</b>)  blogs
        </div>
        <section className="container mx-auto lg:max-w-5xl post-list mt-4">

          <ul>
              {
                posts.edges.map((post) => (
                  <li key={post.node.slug} className="grid grid-cols-5 gap-4 mb-4">
                    <div className="col-span-2">
                      <FeaturedImage post={post} />
                    </div>
                    <div className="col-span-3">
                      <h2 className="py-4">
                        <Link href={`/blog/${post.node.slug}`} className="text-blue-400 text-2xl hover:text-blue-600">{post.node.title}</Link>
                      </h2>
                      <div className="py-4">
                        Published on <Date dateString={post.node.created_at} />

                        <span className="py-2 float-right">{post.node.views} views</span>
                      </div>
                      <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.node.content.substring(0, 120) }}></div>
                      <div className="py-4">
                        <span>Posted by {post.node.author}</span>

                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>

          {/* <Suspense key={query} fallback={<BlogCursorTableSkeleton />}>
            <BlogCursorTable posts={posts}/>
          </Suspense> */}

          <div className="py-4 text-center">
            <LoadMore posts={posts} setPosts={setPosts} search={query} />
          </div>

        </section>
      </main>
    </Layout>
  );
}