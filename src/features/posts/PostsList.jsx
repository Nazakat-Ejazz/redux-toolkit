import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getAllPostsStatus,
  getAllPostsError,
  fetchAllPosts,
} from "./postsSlice";

import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getAllPostsStatus);
  const error = useSelector(getAllPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "success") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failure") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>All Posts</h2>
      <div className="all-posts">{content}</div>
    </section>
  );
};

export default PostsList;
