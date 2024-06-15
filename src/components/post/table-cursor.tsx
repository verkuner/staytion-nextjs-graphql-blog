import Image from 'next/image';
import { ViewPost, UpdatePost, DeletePost  } from '@/src/components/post/buttons';
import { getCursorPageBlogs} from '@/src/modules/blog/blog.cursor.service';
import FeaturedImage from "@/src/components/blog/featuredimage";
import Date from "@/src/libs/date-formatter";
import Link from "next/link";

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function BlogCursorTable({
  posts
}) {
  
  //const blogs = await getCursorPageBlogs(pageSize, "", pageSize, "");

  return (
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

  );
}
