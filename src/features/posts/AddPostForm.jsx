import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSaveClicked = () => {
    if (title && content) {
      dispatch(addNewPost(title, content));

      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h3>Add New Post</h3>
      <form action="">
        <label htmlFor="postTitle">Post Title : </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postTitle">Post Title : </label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          rows="3"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSaveClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
