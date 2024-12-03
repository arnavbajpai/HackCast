import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Link, Text } from "@chakra-ui/react";

const BASEURL = "http://localhost:5000";

const fetchAudio = (audioFileId) => {
  return `${BASEURL}/audio/${audioFileId}`;
};

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${BASEURL}/posts`).then((posts) => {
      console.log(posts.data);
      setPosts(posts.data);
    });
  }, []);

  return (
    <>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Hackernews-Podcasts
        </Heading>

        {posts.map((post) => (
          <Box
            key={post._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            mb={6}
          >
            <Heading as="h3" size="md" mb={2}>
              {post.title}
            </Heading>
            <Link
              href={post.url}
              isExternal
              color="teal.500"
              fontWeight="bold"
              mb={2}
            >
              Read more
            </Link>
            <Text mt={4} fontSize="sm" color="gray.600">
              <audio controls>
                <source
                  src={fetchAudio(post.audio_file_id)}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Text>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default App;
