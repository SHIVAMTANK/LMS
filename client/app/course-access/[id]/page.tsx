'use client'
import CourseContent from "../../component/Course/CourseContent";
import Loader from "@/app/component/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
    params:any;
};

const Page: React.FC<Props> = ({ params }) => {
    const id = params.id;
    
    const {isLoading,error,data} = useLoadUserQuery(undefined,{});

    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:any)=>item._id === id);
            if(!isPurchased){
                redirect("/");
            }
            if(error){
                redirect("/");
            }
        }
    },[data, error, id])


    return (
    <div>
        {
            isLoading ? (
                <Loader />
            ):(
                <div>
                    
                    <CourseContent id={id}/>

                </div>
            )
        }
    </div>
  );
};

export default Page;