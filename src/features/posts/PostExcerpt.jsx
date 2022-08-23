import React from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";

const PostExcerpt = ({ post }) => {
  //console.log("new");
  return (
    <article className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p>{post.body.substring(0, 150)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <Reactions post={post} />
    </article>
  );
};

export default PostExcerpt;
