import { getCursorPageBlogs } from "@/src/modules/blog/blog.cursor.service";

import { useEffect, useState } from "react";

export const revalidate = 0; // no cache
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'


export default function LoadMore({ posts, setPosts, search, moreBlog }) {

  // let buttonTextValue = moreBlog ? 'Load next 5 blogs' : 'No more blogs';
  // let buttonDisabledDefault = moreBlog ? false : true;


  const [buttonText, setButtonText] = useState<string>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();

  useEffect(() => {
    if (moreBlog) {
      setButtonText('Load next 5 blogs');
      setButtonDisabled(false);
    }
    else {
      setButtonText('No more blogs');
      setButtonDisabled(true);
    }
  });

  const handleOnclick = async (event) => {

    setButtonText('Loading...');
    setButtonDisabled(true);

    const morePosts = await getCursorPageBlogs(search, 5, posts.pageInfo.endCursor);

    let updatedPosts = {
      pageInfo: {

      },
      edges: []
    }

    updatedPosts.pageInfo = morePosts.pageInfo;

    posts.edges.map((node) => {
      updatedPosts.edges.push(node);
    });

    morePosts.edges.map((node) => {
      updatedPosts.edges.push(node);
    });

    setPosts(updatedPosts);

    if (morePosts.pageInfo.hasNextPage) {
      setButtonText('Load next 5 blogs');
      setButtonDisabled(false);
    }
    else {
      setButtonText('No more blogs');
      setButtonDisabled(true);
    }
  }
  return (
    <button
      className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
      onClick={handleOnclick}
      disabled={buttonDisabled}>
      {buttonText}
    </button>
  );
}