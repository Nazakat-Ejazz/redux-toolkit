import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

// particles
//import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

import Particles from "./Components/Particles/Particles";

// particles.js
function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
      {/* <Particles id="tsparticles" /> */}
    </main>
  );
}

export default App;
