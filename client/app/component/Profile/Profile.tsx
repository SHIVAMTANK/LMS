"use client";

import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from './ProfileInfo';
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ChangePassword from './ChangePassword';


type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logOut, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logOut ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div
          className={`w-full lg:w-80 h-auto lg:h-[450px] bg-card border border-border rounded-lg shadow-lg transition-all duration-300 
            mt-6 lg:mt-20 mb-6 lg:mb-20 lg:sticky ${
            scroll ? "lg:top-[120px]" : "lg:top-[30px]"
          }`}
        >
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logoutHandler={logOutHandler}
          />
        </div>
        
        <div className="flex-1 mt-6 lg:mt-20">
          {active === 1 && (
            <div className="bg-card border border-border rounded-lg shadow-lg p-6 lg:p-8">
              <ProfileInfo user={user} avatar={user?.avatar} />
            </div>
          )}

          {active === 2 && (
            <div className="bg-card border border-border rounded-lg shadow-lg p-6 lg:p-8">
              <ChangePassword />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;