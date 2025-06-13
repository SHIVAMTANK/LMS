"use client"

import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import Profile from '../component/Profile/Profile'
import { useSelector } from "react-redux";

type Props = {};

const Page: React.FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any)=>state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} Profile - Learnex`}
          description="Learnex is a platform for students to learn and get help from teachers"
          keywords="Online Learning Platform, Learn Programming, Next.js Course, TypeScript, Machine Learning, Virtual Classroom, Coding for Students, eLearning System, Redux Tutorial, Web Development LMS"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
