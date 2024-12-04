import { useState, useEffect } from "react";
import axios from "axios";
import PostList from "./components/PostList";

export const BASEURL = "http://localhost:5000";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${BASEURL}/posts`).then((posts) => {
      console.log(posts.data);
      setPosts(posts.data);
    });
  }, []);

  return <PostList posts={posts} />;
}

export default App;
