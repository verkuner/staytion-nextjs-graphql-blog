import Head from "next/head";
import Link from "next/link";

import SiteHeader from "@/src/components/blog/siteheader";
import SiteFooter from "@/src/components/blog/sitefooter";
import FeaturedImage from "@/src/components/blog/featuredimage";
import { getCursorPageBlogs } from "@/src/modules/blog/blog.cursor.service";

import { countBlogs, countSearchBlogs } from '@/src/modules/blog/blog.service';
import Search from '@/src/components/layout/searchbar';
import { Suspense, useEffect } from 'react';
import BlogCursorTable from "@/src/components/post/table-cursor"

import Date from "@/src/libs/date-formatter";
import { BlogCursorTableSkeleton } from '@/src/components/home/skeletons';

import LoadMore from "@/src/components/blog/loadmore";
import { useState, useRef } from "react";
import { IBlogData, IBlogConnection } from "@/src/modules/blog/blog.types";
import Layout from "./layout"

import { unstable_noStore as noStore } from 'next/cache';
import SearchBar from "@/src/components/layout/searchbar";

import { SearchProvider, useSearches } from "@/src/components/layout/searchcontext";
import { useRouter } from "next/router";

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'


export async function getServerSideProps(context: any) {

  const { page, query } = context.query;

  const allPosts = await getCursorPageBlogs(query, 5);

  return {
    props: {
      allPosts: allPosts,
      query: query ? query : "",
    },
  }
}

export default function BlogHome({ allPosts, query }) {
  const [posts, setPosts] = useState(allPosts);
  const [searchCount, setSearchCount] = useState(allPosts.totalCount);
  const [searchQuery, setSearchQuery] = useState(query);
  const [moreBlog, setMoreBlog] = useState<boolean>(allPosts.pageInfo.hasNextPage);

  const router = useRouter();
  const { addSearch, updateSelectedSearch, selectedSearch } = useSearches();

  async function handleSearch(value: string) {
    updateSelectedSearch(value);
    let newUrl = ''
    if (!value) {
      newUrl = "/blog";
    } else {
      addSearch(value);
      newUrl = `/blog/?query=${encodeURIComponent(value)}`;
    }

    setSearchQuery(value);

    const searchPosts = await getCursorPageBlogs(value, 5);
    setPosts(searchPosts);
    setSearchCount(searchPosts.totalCount);
    setMoreBlog(searchPosts.pageInfo.hasNextPage);
    

    router.replace(newUrl);
    
  }

  const handleSearchButtonOnclick = async (event) => {
    handleSearch(selectedSearch);
  }

  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <main>
        <div className="h-[20vh] min-h-[3rem] relative">
          <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>



          <h2 className="text-4xl text-center text-slate-200 relative z-10 py-2">BLOG</h2>

          <div className="container mx-auto lg:max-w-4xl flex items-center justify-between gap-4 md:mt-4">
            <SearchBar onSearch={handleSearch} />

            <button
              className="bg-blue-300 text-slate-900 px-4 py-2 hover:bg-blue-500"
              onClick={handleSearchButtonOnclick}
            >
              Search
            </button>

          </div>
        </div>
        <div className="container text-center mx-auto text-2xl lg:max-w-5xl post-list mt-4">
          Total (<b>{searchCount}</b>)  blogs
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
            <LoadMore posts={posts} setPosts={setPosts} search={searchQuery} moreBlog={moreBlog} />
          </div>

        </section>
      </main>
    </Layout>
  );
}