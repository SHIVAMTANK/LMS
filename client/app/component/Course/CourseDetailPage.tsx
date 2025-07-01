"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetail from './CourseDetail'

type Props = {
  id: string;
};

const CourseDetailPage: React.FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  if (isLoading) return <Loader />;

  if (!data || !data.course) {
    return <div className="text-red-500 text-center mt-10">Course not found.</div>;
  }

  return (
    <>
      <Heading
        title={`${data.course.name} - Learnex`}
        description={
          "Learnex is a programming community which is developed by Shivam Tank for helping programmers"
        }
        keywords={data.course.tags}
      />
      <Header
      route={route}
      setRoute={setRoute}
      open={open}
      setOpen={setOpen}
      activeItem={1}
      />
        <CourseDetail 
        data={data?.course}
        />
      <Footer />
    </>
  );
};

export default CourseDetailPage;
