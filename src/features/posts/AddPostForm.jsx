import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onAuthorChange = (e) => {
    setUserId(e.target.value);
  };

  const onSaveClicked = () => {
    if (title && content) {
      dispatch(addNewPost(title, content, userId));

      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const AuthorsMenuItem = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
        <label htmlFor="postAuthor">Author : </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {AuthorsMenuItem}
        </select>
        <label htmlFor="postContent">Post Content : </label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          rows="3"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSaveClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
