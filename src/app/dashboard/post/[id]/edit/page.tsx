// "use client";

import Breadcrumbs from '@/src/components/post/breadcrumbs';
import Date from "@/src/libs/date-formatter";
import { headers } from 'next/headers'

import {GetBlogsById, InsertBlogViews, loadSinglePostWithInsertViews } from "@/src/modules/blog/blog.service";
import {IBlogNodes, IBlogData} from "@/src/modules/blog/blog.types"


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]


  const data = await Promise.all([
    loadSinglePostWithInsertViews(id, ip)
  ]);

  const post = data[0];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Blogs', href: '/dashboard/post' },
          {
            label: 'View Blog',
            href: `/dashboard/post/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="bg-gray-50 md:p-6">
        <h1>{post.node.title}</h1>
      </div>
      <div className="bg-gray-50 md:p-6">
        <table className="hidden min-w-full text-gray-900 md:table">
          <tr>
            <td>
              <Date dateString={post.node.created_at.toLocaleString()} />
            </td>
            <td>
              By <span>{post.node.author}</span>
            </td>
            <td>
              <span>{post.node.views} Views</span>
            </td>
          </tr>
        </table>
      </div>
      <div className="rounded-md bg-gray-50 md:p-6">

        <div className="mb-2 block text-sm font-medium" dangerouslySetInnerHTML={{ __html: post.node.content }} />

      </div>

    </main>
  );
}
