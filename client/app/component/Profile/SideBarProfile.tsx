import Image from "next/image";
import React from "react";
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: any) => void;
  logoutHandler: any;
};

const SideBarProfile: React.FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      {/* My Account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar || avatar : avatarDefault}
          alt="Avatar"
          width={30}
          height={30}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
