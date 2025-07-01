'use client'
import React from 'react';
import CourseDetailPage from '../../component/Course/CourseDetailPage';

const Page = (props:any) => {
  
    const { id }:any = React.use(props.params);
  
    return (
    <div>
      <CourseDetailPage id={id} />
    </div>
  );
};

export default Page;
