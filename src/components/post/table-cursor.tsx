import Image from 'next/image';
import { ViewPost, UpdatePost, DeletePost  } from '@/src/components/post/buttons';
import { getCursorPageBlogs} from '@/src/modules/blog/blog.cursor.service';

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function BlogCursorTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pageSize = 8;
  const blogs = await getCursorPageBlogs(pageSize, "", pageSize, "");

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Views
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Operation</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {blogs?.edges.map((blog) => (
                <tr
                  key={Number(blog.node.slug)}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{blog.node.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.node.author}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.node.content.substring(0,80)} ...
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.node.created_at.toLocaleString("en-US").substring(0,10)}
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.node.views}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPost  id={blog.node.slug} />
                      <UpdatePost id={blog.node.slug} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
