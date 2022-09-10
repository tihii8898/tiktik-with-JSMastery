import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../models";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";

const Search = ({ videos }: { videos: Video[] }) => {
  const [showAccount, setShowAccount] = useState(true);
  const router = useRouter();

  const { allUsers } = useAuthStore();

  const { searchTerm }: any = router.query;
  const onAccountTag = showAccount
    ? "border-b-2 border-black"
    : "text-gray-400";
  const onVideoTag = !showAccount ? "border-b-2 border-black" : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full ">
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${onAccountTag}`}
          onClick={() => setShowAccount(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${onVideoTag}`}
          onClick={() => setShowAccount(false)}
        >
          Videos
        </p>
      </div>
      {showAccount ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div className="hidden xl:block ">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult text={`No account founded for "${searchTerm}" ! `} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResult text={`No video founded for "${searchTerm}" ! `} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
