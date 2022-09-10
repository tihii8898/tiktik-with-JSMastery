import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Video } from "../../models";
import { BASE_URL } from "../../utils";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Comments from "../../components/Comments";
import LikeBtn from "../../components/LikeBtn";
import useAuthStore from "../../store/authStore";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setIsHover] = useState(true);
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };
  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap gap-6">
      <div className="relative flex-2 w-[60vw] lg:w-6/10 justify-center items-center bg-black ">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50 ">
          <button onClick={() => router.back()}>
            <IoChevronBackCircleOutline className="text-white text-[35px]" />
          </button>
        </div>
        <div
          className="relative "
          onMouseLeave={() => setIsHover(false)}
          onMouseEnter={() => setIsHover(true)}
        >
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          {isHover && (
            <>
              <div className="absolute top-[45%] left-[45%] cursor-pointer">
                {!playing ? (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-white text-6xl" />
                  </button>
                ) : (
                  isHover && (
                    <button onClick={onVideoClick}>
                      <BsFillPauseFill className="text-white text-6xl" />
                    </button>
                  )
                )}
              </div>

              <div className="absolute bottom-[10%] right-[5%] cursor-pointer">
                {isMuted ? (
                  <button onClick={() => setIsMuted(false)}>
                    <HiVolumeOff className="text-white text-4xl" />
                  </button>
                ) : (
                  <button onClick={() => setIsMuted(true)}>
                    <HiVolumeUp className="text-white text-4xl" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg-[700px]">
        <div className="flex lg:mt-20 mt-10 ">
          <div className="md:w-20 md:h-20 w-16 h-16">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <Link href="/">
            <div className="flex flex-col  gap-2 ml-2 mt-4">
              <p className="flex  gap-2 md:text-md text-primary font-bold">
                {post.postedBy.userName}
                <GoVerified className="text-blue-400 text-md " />
              </p>
              <p className="capitalize text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
        <p className="mx-5 my-10 text-lg text-gray-500">{post.caption}</p>
        <div className="mt-10 px-10">
          {userProfile && (
            <LikeBtn
              likes={post.likes}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
          )}
        </div>
        <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
