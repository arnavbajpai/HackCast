import { Box, Center } from "@chakra-ui/react";
import PostCard from "./PostCard";
import Title from "./Title";
import { ExpandableCard } from "./ui/ExpandableCard";

const PostList = ({ posts }) => {
  return (
    <>
      <Center>
        <Title />
      </Center>
      <ExpandableCard cards={posts} />
    </>
  );
};

export default PostList;
