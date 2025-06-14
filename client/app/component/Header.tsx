import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import CustomModal from "../utils/CustomModal";
import Login from "../component/Auth/Login";
import SignUp from "../component/Auth/SignUp";
import Verification from "../component/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, route, setRoute, activeItem }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const [logOut, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logOut ? true : false,
  });
  // console.log(data);

  const avatarSrc =
    typeof user.avatar === "string" && user.avatar.trim()
      ? user.avatar
      : avatar;

    
  useEffect(() => {
    // Sync session with Redux only when using social login
    if (!user && data) {
      localStorage.setItem("wasSocialUser", "true");
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
    }

    // Handle logout only if it was a social login session
    if (!user && data === null && typeof window !== "undefined") {
      const wasSocialUser = localStorage.getItem("wasSocialUser") === "true";
      if (wasSocialUser) {
        setLogout(true);
        localStorage.removeItem("wasSocialUser");
      }
    }

    // Show toast after successful social login
    if (data === null && isSuccess) {
      toast.success("Login successful");
    }
  }, [data, isSuccess, error, user, socialAuth]);
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  // console.log(user);

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              Learnex
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={avatarSrc}
                    alt="User Avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{border:activeItem === 5 ? "2px solide #37a39a":"none"}}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[999999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © 2023 Learnex
              </p>
            </div>
          </div>
        )}
      </div>
      {/* model based routing is happing in this  */}
      {/* when is click signup it's only change the state of component  form */}
      {/* login to signup */}

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
