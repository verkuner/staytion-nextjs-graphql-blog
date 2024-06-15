import { getCursorPageBlogs } from "@/src/modules/blog/blog.cursor.service";

import { useState } from "react";

export default function LoadMore({ posts, setPosts, search }) {

  let buttonTextValue = posts.pageInfo.hasNextPage ? 'Load next 5 blogs' : 'No more blogs';
  let buttonDisabledDefault = posts.pageInfo.hasNextPage ? false : true;

  const [buttonText, setButtonText] = useState(buttonTextValue);
  const [buttonDisabled, setButtonDisabled] = useState(buttonDisabledDefault);

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