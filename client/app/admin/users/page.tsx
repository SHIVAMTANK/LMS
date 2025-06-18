"use client";
import DashboardHero from "@/app/component/Admin/DashboardHero";
import { AppSidebar } from "@/app/component/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AllUser from "../../component/Admin/Users/AllUsers"

type Props = {};

const ComponentName: React.FC<Props> = ({}) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Learnex - Admin"
          description="Learnex is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <AppSidebar />
          <div className="flex-1 flex flex-col gap-10 transition-all duration-300">
            <DashboardHero />
            <AllUser />
            {/* Other dashboard content goes here */}
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default ComponentName;
