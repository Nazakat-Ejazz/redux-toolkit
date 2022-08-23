import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { submitNewPost } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addReqStatus, setAddReqStatus] = useState("idle");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const canSave =
    [title, content, userId].every(Boolean) && addReqStatus === "idle";

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
    if (canSave) {
      try {
        setAddReqStatus("pending");
        dispatch(
          submitNewPost({
            title,
            body: content,
            userId,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Error: adding a new post failed !");
      } finally {
        setAddReqStatus("idle");
      }
    }
  };

  const AuthorsMenuItem = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="post-form">
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
