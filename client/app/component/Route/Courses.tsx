"use client"

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import type React from "react"
import { useEffect, useState } from "react"
import CourseCard from "../Course/CourseCard"

type Props = {}

const Courses: React.FC<Props> = ({}) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({})

  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    setCourses(data?.courses)
  }, [data])

  return (
    <div className="text-black dark:text-white relative pb-20 -mt-20">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 relative z-10 pt-20">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 transition-all duration-500">
            Expand Your Career{" "}
            <span className="text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text">
              Opportunity
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Discover our comprehensive collection of courses designed to accelerate your professional growth
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in delay-200">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && courses && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in delay-200">
            {courses.map((item: any, index: number) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <CourseCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!courses || courses.length === 0) && (
          <div className="text-center py-20 animate-fade-in delay-300">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No courses available</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new courses</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
