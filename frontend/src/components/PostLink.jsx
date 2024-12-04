import { Link } from "@chakra-ui/react";
const PostLink = ({ link }) => {
  return (
    <Link href={link} isExternal color="teal.500" fontWeight="bold" mb={2}>
      Read more
    </Link>
  );
};

export default PostLink;
