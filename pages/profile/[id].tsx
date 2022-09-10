import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../models";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikeVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userLikeVideos, userVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    showUserVideos ? setVideoList(userVideos) : setVideoList(userLikeVideos);
  }, [showUserVideos, userLikeVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 bg-white mb-4 w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={34}
            height={34}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex gap-1 items-center text-md font-bold text-primary lowercase text-2xl">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Likes
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList.length > 0 ? (
            videoList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResult
              text={`No ${showUserVideos ? "" : "Liked"} video yet !`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
