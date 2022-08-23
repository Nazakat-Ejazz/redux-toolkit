import React from "react";
import { useDispatch } from "react-redux";
import { addNewReaction } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "🧡",
  rocket: "🚀",
  coffee: "☕",
};



const Reactions = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          dispatch(addNewReaction({ postId: post.id, reaction: name }));
          console.log(post.id);
          console.log(name);
        }}
      >
        <span>{emoji}</span> {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default Reactions;

// import { useDispatch } from "react-redux";
// import { addNewReaction } from "./postsSlice";

// const reactionEmoji = {
//   thumbsUp: "👍",
//   wow: "😮",
//   heart: "❤️",
//   rocket: "🚀",
//   coffee: "☕",
// };

// const Reactions = ({ post }) => {
//   const dispatch = useDispatch();

//   const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
//     return (
//       <button
//         key={name}
//         type="button"
//         className="reactionButton"
//         onClick={() =>
//           dispatch(addNewReaction({ postId: post.id, reaction: name }))
//         }
//       >
//         {emoji} {post.reactions[name]}
//       </button>
//     );
//   });

//   return <div>{reactionButtons}</div>;
// };
// export default Reactions;
