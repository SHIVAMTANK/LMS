"use client";

import { type FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./component/Header";
import Hero from "./component/Route/Hero";
import Courses from "./component/Route/Courses";
const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800">
      <Heading
        title="Learnex"
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
      <Hero />
      <Courses />
      
    </div>
  );
};

export default Page;
