"use client"

import type React from "react"
import CoursePlayer from "@/app/utils/CoursePlayer"
import Ratings from "@/app/utils/Ratings"
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Users,
  Award,
  Shield,
  Code,
  Download,
  Infinity,
  HeadphonesIcon,
  BookOpen,
  Target,
  CheckCircle,
  PlayCircle,
  DollarSign,
  Percent,
  Gift,
  Star,
  Globe,
  Monitor,
  Zap,
} from "lucide-react"

type Props = {
  active: number
  setActive: (active: number) => void
  courseData: any
  handleCourseCreate: any
}

const CoursePreview: React.FC<Props> = ({ active, setActive, courseData, handleCourseCreate }) => {
  const discountPercentenge = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100
  const discountPercentengePrice = discountPercentenge.toFixed(0)

  const prevButton = () => {
    setActive(active - 1)
  }

  const createCourse = () => {
    handleCourseCreate()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <PlayCircle className="w-6 h-6 mr-2 text-blue-600" />
              {courseData?.name}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ratings rating={0} />
                <span className="text-xs text-gray-600 dark:text-gray-400">0 Reviews</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <Users className="w-3 h-3" />
                <span>0 Students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Video Player */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
            </div>

            {/* Desktop Course Header */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <BookOpen className="w-7 h-7 mr-3 text-blue-600" />
                  {courseData?.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Ratings rating={0} />
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Star className="w-4 h-4 mr-1" />0 Reviews
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>0 Students Enrolled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-600" />
                What you will learn from this course?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {courseData?.benefits?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-600" />
                Prerequisites for this course
              </h2>
              <div className="space-y-3">
                {courseData?.prerequisites?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <IoCheckmarkDoneOutline className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-indigo-600" />
                Course Details
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {courseData?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
              {/* Pricing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-4 sm:space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2 flex-wrap">
                      <div className="flex items-center">
                        <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-1" />
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                          {courseData?.price === 0 ? "Free" : courseData?.price}
                        </span>
                      </div>
                      {courseData?.estimatedPrice > courseData?.price && (
                        <>
                          <span className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 line-through flex items-center">
                            <DollarSign className="w-4 h-4 mr-0.5" />
                            {courseData?.estimatedPrice}
                          </span>
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center">
                            <Percent className="w-3 h-3 mr-1" />
                            {discountPercentengePrice}% Off
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-not-allowed opacity-75 flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Buy Now ${courseData?.price}</span>
                  </button>

                  {/* Discount Code */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Have a discount code?
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="text"
                        placeholder="Enter discount code..."
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm sm:text-base"
                      />
                      <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center text-sm sm:text-base">
                      <Award className="w-5 h-5 mr-2 text-blue-600" />
                      This course includes:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Source code included
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Infinity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Full lifetime access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Certificate of completion
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <HeadphonesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Premium Support</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Desktop & Mobile access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Downloadable resources
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Course Stats */}
              <div className="lg:hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Course Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900 dark:text-white">0</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900 dark:text-white">0.0</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={prevButton}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Step</span>
            </button>
            <button
              onClick={createCourse}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <span>Create Course</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview
