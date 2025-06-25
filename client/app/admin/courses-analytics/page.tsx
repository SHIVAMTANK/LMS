
import type React from "react"
import { AppSidebar } from "@/app/component/Admin/sidebar/AdminSidebar"
import Heading from "@/app/utils/Heading"
import DashboardHeader from "@/app/component/Admin/DashboardHeader"
import CourseAnalytics from '../../component/Admin/Analytics/CourseAnalytics'

type Props = {}

const page: React.FC<Props> = ({}) => {
  return (
    <div>
      <Heading
        title="Learnex - Create Course"
        description="Learnex is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 transition-all duration-300">
          <DashboardHeader />
          <div className="p-4">
            <CourseAnalytics />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
