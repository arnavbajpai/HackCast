import { Center } from "@chakra-ui/react";
import Title from "./Title";
import { ExpandableCard } from "./ui/ExpandableCard";
import Footer from "./Footer";

const PostList = ({ posts }) => {
  return (
    <>
      <Center>
        <Title />
      </Center>
      <ExpandableCard cards={posts} />
      <Footer />
    </>
  );
};

export default PostList;
