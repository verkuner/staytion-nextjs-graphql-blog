import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type BlogProps = {
  id: string;
  title: string;
  author: string | null;
  content: string;
  published: boolean;
  create_at: Date;
  update_at: Date;
};

const Post: React.FC<{ blog: BlogProps }> = ({ blog }) => {
  const authorName = blog.author ? blog.author : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${blog.id}`)}>
      <h2>{blog.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
