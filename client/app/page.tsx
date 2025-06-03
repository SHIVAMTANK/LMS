"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./component/Header";
import Hero from "./component/Route/Hero";


const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  //for popup



  return (
    <div>
      <Heading
        title="Learnex"
        description="Learnex is a platform for students to learn and get help from teachers"
        keywords="Online Learning Platform, Learn Programming, Next.js Course, TypeScript, Machine Learning, Virtual Classroom, Coding for Students, eLearning System, Redux Tutorial, Web Development LMS"
       
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem}  setRoute = {setRoute}
        route = {route}/>
      <Hero />
    </div>
  );
};

export default Page;
