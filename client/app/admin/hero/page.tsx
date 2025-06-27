
import type React from "react"
import { AppSidebar } from "@/app/component/Admin/sidebar/AdminSidebar"
import Heading from "@/app/utils/Heading"
import DashboardHeader from "@/app/component/Admin/DashboardHeader"
import EditHero from '../../component/Admin/Customization/EditHero'
import { useState } from "react"

type Props = {}

const Page: React.FC<Props> = ({}) => {
  const [open,setOpen] = useState<boolean>(false);
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
          <DashboardHeader open={open} setOpen={setOpen}/>
          <div className="p-4">
            <EditHero />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;
