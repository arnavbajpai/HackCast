import { useState, useEffect } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import { Spinner, Center, VStack, Text } from "@chakra-ui/react";
import "./globals.css";

// export const BASEURL = "http://localhost:5000"; // Local Environment
export const BASEURL = "https://hackcast.onrender.com"; // Production Environment

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${BASEURL}/posts`).then((posts) => {
      console.log(posts.data);
      setPosts(posts.data);
    });
  }, []);

  // return posts == [] ? <Spinner /> : <PostList posts={posts} />;
  return posts == [] ? (
    <Center>
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" size="xl" />
        <Text color="colorPalette.600" fontSize="xl">
          Loading...
        </Text>
      </VStack>
    </Center>
  ) : (
    <PostList posts={posts} />
  );
}

export default App;
