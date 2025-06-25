import type React from "react"
import { AppSidebar } from "@/app/component/Admin/sidebar/AdminSidebar"
import Heading from "@/app/utils/Heading"
import DashboardHeader from "@/app/component/Admin/DashboardHeader"
import UsersAnalytics from "../../component/Admin/Analytics/UsersAnalytics"

type Props = {}

const page: React.FC<Props> = ({}) => {
  return (
    <div>
      <Heading
        title="Learnex - Users Analytics"
        description="Learnex is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 transition-all duration-300">
          <DashboardHeader />
          <UsersAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page
