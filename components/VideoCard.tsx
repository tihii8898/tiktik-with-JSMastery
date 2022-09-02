import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { Video } from "../models";

interface VideoCardProps {
  post: Video;
}

const VideoCard: NextPage<VideoCardProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
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
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 md:text-md text-primary font-bold">
                {post.postedBy.userName}
                <GoVerified className="text-blue-400 text-md " />
              </p>
              <p className="capitalize text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="rounded-3xl"
        >
          <Link href="">
            <video
              loop
              ref={videoRef}
              className="lg:w[600px] h-[300px] md:h-[400px] lg:h-[450px] cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-15 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
