import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Video } from "../models";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
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

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
