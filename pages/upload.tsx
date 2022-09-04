import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

type Props = {};

const Upload = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileType = ["video/mp4", "video/webm", "video/ogg"];

    if (fileType.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}:3000/api/post`, document);
      router.push("/");
    }
  };
  return (
    <div className="flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg lg:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 h-[460px] w-[260px] cursor-pointer p-10 hover:border-red-200 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading ...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer ">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-bold ">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold ">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or Ogg
                        <br />
                        720x1280 resolution or higher
                        <br />
                        Up to 10 minutes
                        <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label htmlFor="" className="text-md font-medium">
            Caption
          </label>
          <input
            type="text"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="rounded outline-none text-md border-2 border-gray-200 p-2 "
          />
          <label htmlFor="" className="text-md font-medium">
            Choose a Category
          </label>
          <select
            name=""
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="outline-none border-2 border-gray-200 capitalize cursor-pointer p-2 text-md lg:p-4 rounded"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10 ">
            <button
              onClick={() => {}}
              type="button"
              className=" w-28 p-2 bg-red-500 text-white text-md lg:w-44 rounded font-medium"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className=" w-28 p-2 bg-green-400 text-white text-md lg:w-44 rounded font-medium"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
