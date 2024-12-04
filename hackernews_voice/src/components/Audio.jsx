import { BASEURL } from "../App";
import { Text } from "@chakra-ui/react";

const fetchAudio = (audioFileId) => {
  return `${BASEURL}/audio/${audioFileId}`;
};

const Audio = ({ post }) => {
  return (
    <Text mt={4} fontSize="sm" color="gray.600">
      <audio controls>
        <source src={fetchAudio(post.audio_file_id)} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Text>
  );
};

export default Audio;
