import { Box, Center } from "@chakra-ui/react";
import PostCard from "./PostCard";
import Title from "./Title";

const PostList = ({ posts }) => {
  return (
    <>
      <Center>
        <Title />
      </Center>
      <Box p={4}>
        {posts.map((post) => (
          <Box
            key={post._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            mb={6}
          >
            <PostCard post={post} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PostList;
