import { AppSidebar } from "@/app/component/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/component/Admin/DashboardHeader";
import EditCourse from "@/app/component/Admin/Course/EditCourse";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const id = params.id;

  return (
    <div>
      <Heading
        title="Learnex - Admin"
        description="Learnex is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 transition-all duration-300">
          <DashboardHeader />
          <div className="p-4">
            <EditCourse id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
