import Audio from "./Audio";
import PostTitle from "./PostTitle";
import PostLink from "./PostLink";
import { formatDistanceToNow } from "date-fns";
import { Text } from "@chakra-ui/react";

const PostCard = ({ post }) => {
  console.log(post);
  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });
  return (
    <>
      <PostTitle title={post.title} />
      <Text color="gray.500" mb={2}>
        {timeAgo}
      </Text>
      <PostLink link={post.url} />
      <Audio post={post} />
    </>
  );
};

export default PostCard;
