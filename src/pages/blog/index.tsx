import Head from "next/head";
import Link from "next/link";

import SiteHeader from "@/src/components/blog/siteheader";
import SiteFooter from "@/src/components/blog/sitefooter";
import FeaturedImage from "@/src/components/blog/featuredimage";
import { getCursorPageBlogs } from "@/src/modules/blog/blog.cursor.service";

import { countBlogs, countSearchBlogs } from '@/src/modules/blog/blog.service';
import Search from '@/src/components/layout/search.cursor';
import { Suspense } from 'react';
import BlogCursorTable from "@/src/components/post/table-cursor"

import Date from "@/src/libs/date-formatter";
import { BlogCursorTableSkeleton } from '@/src/components/home/skeletons';

import LoadMore from "@/src/components/blog/loadmore";
import { useState } from "react";
import { IBlogData, IBlogConnection } from "@/src/modules/blog/blog.types";

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export async function getServerSideProps(context) {

  context.res.setHeader('Cache-Control', 'no-cache');

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

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="h-[30vh] min-h-[3rem] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <div className="container lg:max-w-4xl mx-auto">
          <SiteHeader className="header-blog-home z-10 relative" />
        </div>

        <h2 className="text-4xl text-center text-slate-200 relative z-10 py-2">BLOG</h2>

        <div className="container mx-auto lg:max-w-4xl flex items-center justify-between gap-4 md:mt-4">
          <Search placeholder="Search blogs..." />

          <span className="float-right text-2xl">
            Total (<b>{total}</b>)  blogs
          </span>
        </div>
      </div>
      <main>
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
      <SiteFooter />
    </>
  );
}