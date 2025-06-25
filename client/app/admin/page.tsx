"use client"
import type React from "react"
import Heading from "../utils/Heading"
import { AppSidebar } from "../component/Admin/sidebar/AdminSidebar"
import AdminProtected from "../hooks/adminProtected"
import DashboardHero from "../component/Admin/DashboardHero"

type Props = {}

const AdminDashboard: React.FC<Props> = ({}) => {
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
          <div className="flex-1 transition-all duration-300">
            <DashboardHero isDashboard={true} />
            {/* Other dashboard content goes here */}
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default AdminDashboard
