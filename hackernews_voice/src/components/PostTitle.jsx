import { Heading } from "@chakra-ui/react";

const PostTitle = ({ title }) => {
  return (
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
  );
};

export default PostTitle;
