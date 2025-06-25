"use client"

import { styles } from "@/app/styles/style"
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import Image from "next/image"
import type React from "react"
import { useEffect, useState } from "react"

type Props = {
  courseInfo: any
  setCourseInfo: (courseInfo: any) => void
  active: number
  setActive: (active: number) => void
}

const CourseInformation: React.FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDragging] = useState(false)

  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  })

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories)
    }
  }, [data])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setActive(active + 1)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setDragging(false)

    const file = e.dataTransfer.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-[85%] max-w-5xl mx-auto mt-16 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
        Course Information
      </h2>
      <form onSubmit={handleSubmit} className={`${styles.label} space-y-6`}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course Name
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo?.name || ""}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2 w-full px-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200 resize-none`}
            value={courseInfo?.description || ""}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
          ></textarea>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                name=""
                required
                value={courseInfo?.price || ""}
                onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                id="price"
                placeholder="29"
                className={`${styles.input} w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estimated Price (optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                name=""
                value={courseInfo?.estimatedPrice || ""}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="79"
                className={`${styles.input} w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="tags">
            Course Tags
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo?.tags || ""}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
            id="tags"
            placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
            className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Separate tags with commas</p>
        </div>

        {/* NEW: Course Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
            Course Category
          </label>
          <select
            name=""
            required
            value={courseInfo?.category || ""}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, category: e.target.value })}
            id="category"
            className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200 min-h-[48px] leading-normal appearance-none`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.map((category: any, index: number) => (
              <option key={index} value={category.title} className="py-2">
                {category.title}
              </option>
            ))}
          </select>
          {isLoading && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Loading categories...</p>}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo?.level || ""}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo?.demoUrl || ""}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              id="demoUrl"
              placeholder="https://example.com/demo"
              className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200`}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Thumbnail</label>
          <input type="file" accept="image/*" id="file" className="hidden" onChange={handleFileChange} />
          <label
            htmlFor="file"
            className={`w-full min-h-[15vh] border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              dragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo?.thumbnail ? (
              <div className="relative w-full">
                <Image
                  src={courseInfo.thumbnail || "/placeholder.svg"}
                  alt="Course Thumbnail"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-md max-h-[300px] shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                  <span className="bg-white dark:bg-gray-800 text-sm py-1 px-3 rounded-full shadow-lg">
                    Change Image
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </label>
        </div>

        <div className="w-full flex items-center justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto"
          >
            Next Step
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseInformation
