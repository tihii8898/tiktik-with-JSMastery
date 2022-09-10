import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Video } from "../models";
import { BASE_URL } from "../utils";

interface homeProps {
  videos: Video[];
}

const Home = ({ videos }: homeProps) => {
  return (
    <h1 className="text-3xl font-bold">
      <div>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <div>No Result</div>
        )}
      </div>
    </h1>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
