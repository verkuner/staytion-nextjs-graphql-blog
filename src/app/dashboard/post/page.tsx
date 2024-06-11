import { lusitana } from '@/src/components/layout/fonts';
import { CreateBlog } from '@/src/components/post/buttons';
import Search from '@/src/components/layout/search';
import { BlogTableSkeleton } from '@/src/components/home/skeletons';
import { Suspense } from 'react';
import Table from '@/src/components/post/table';
import { getPageBlogs, countBlogs, countSearchBlogs, searchBlogs } from '@/src/modules/blog/blog.service';
import {IBlog} from '@/src/modules/blog/blog.types';

import Pagination from '@/src/components/post/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staytion Blog',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const count = (query==="") ? await countBlogs() : await countSearchBlogs(query);

  const totalPages = Math.ceil(count /2) ;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Staytion Blog</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search blogs..." />
        <CreateBlog />
      </div>
      <Suspense key={query + currentPage} fallback={<BlogTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <span className="items-left justify-left gap-2 md:mt-2">Total: {count }  </span> &nbsp;&nbsp;
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
// useSearchParam -> /dashboard/post?page=1&query=pending = {page: '1', query: 'pending'}
// usePathname -> /dashboard/post = /dashboard/post
// useRouter

// Capture the user's input.
// Update the URL with the search params.
// Keep the URL in sync with the input field.
// Update the table to reflect the search query.
