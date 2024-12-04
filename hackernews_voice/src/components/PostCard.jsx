import Audio from "./Audio";
import PostTitle from "./PostTitle";
import PostLink from "./PostLink";

const PostCard = ({ post }) => {
  return (
    <>
      <PostTitle title={post.title} />

      <PostLink link={post.url} />
      <Audio post={post} />
    </>
  );
};

export default PostCard;
