import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from './CourseContentMedia'
import Header from "../Header";

type Props = {
    id:string
};

const CourseContent: React.FC<Props> = ({ id }) => {
    
    const {data:contententData,isLoading} = useGetCourseContentQuery(id);
    const [activeVideo,setActiveVideo] = useState(0);
    const[open,setOpen] = useState(false);
    const [route,setRoute] = useState('Login');

    const data = contententData?.content;

  return (
    <>
        {
            isLoading ? (
                <Loader />
            ):(
               <>
                <Header 
                    activeItem={1}
                    open={open}
                    setOpen={setOpen}
                    route={route}
                    setRoute={setRoute}
                />
                 <div className="w-full grid md:grid-cols-10">
                   <Heading 
                    title={data[activeVideo]?.title}
                    description="anything"
                    keywords={data[activeVideo]?.tags}
                   />

                    <div className="col-span-7">
                        <CourseContentMedia 
                            data={data}
                            id={id}
                            activeVideo = {activeVideo}
                            setActiveVideo={setActiveVideo}
                        />
                    </div>
                   
                </div>
               </>
            )
        }  
    </>
  );
};

export default CourseContent;