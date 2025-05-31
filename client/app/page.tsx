"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";

interface Props {}

const Page: FC<Props> = () => {
  return (
    <div>
      <Heading
        title="Learnex"
        description="Learnex is a platform for students to learn and get help from teachers"
        keywords="Online Learning Platform, Learn Programming, Next.js Course, TypeScript, Machine Learning, Virtual Classroom, Coding for Students, eLearning System, Redux Tutorial, Web Development LMS"
      />
    </div>
  );
};

export default Page;
