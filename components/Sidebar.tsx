import Link from "next/link";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 p-3 justify-center xl:justify-start  cursor-pointer font-semibold text-[#F51997] rounded hover:bg-primary";
  return (
    <div>
      <div
        className=" m-2 ml-4 mt-3 text-xl block "
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <TbLayoutSidebarLeftCollapse /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-10 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-100 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiOutlineHome />
                </p>
                <span className="text-xl hidden text-black xl:block">Home</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">Log in to like and comment</p>
              <div className="pr-4 py-2">
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#F51997] cursor-pointer border-[1px] border-[#F51997] px-4 py-2 rounded-md w-full hover:text-white text-semibold mt-3 hover:bg-[#F51997]"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Login by GOOGLE
                    </button>
                  )}
                  clientId=""
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single-host-origin"
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
