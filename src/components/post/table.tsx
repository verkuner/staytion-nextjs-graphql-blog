import Image from 'next/image';
import { ViewPost, UpdatePost, DeletePost  } from '@/src/components/post/buttons';
import { getPageBlogs, countBlogs, searchBlogs } from '@/src/modules/blog/blog.service';


export default async function BlogTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pageSize = 2;
  const blogs = await searchBlogs(query, pageSize, (currentPage-1)*pageSize);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {blogs?.map((blog) => (
              <div
                key={Number(blog.slug)}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{blog.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{blog.author}</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">
                      {blog.views}
                    </p>

                    <p className="text-xl font-medium">
                      {blog.created_at.toLocaleString()}
                      </p>
                  </div>

                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePost id={String(blog.slug)} />
                    <DeletePost id={String(blog.slug)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              {blogs?.map((blog) => (
                <tr
                  key={Number(blog.slug)}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{blog.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.author}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.content.substring(0,80)} ...
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.created_at.toLocaleString("en-US").substring(0,10)}
                    
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {blog.views}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewPost  id={blog.slug} />
                      <UpdatePost id={blog.slug} />
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
