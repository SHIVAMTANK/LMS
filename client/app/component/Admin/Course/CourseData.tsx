"use client"

import { styles } from "@/app/styles/style"
import type React from "react"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import toast from "react-hot-toast"

type Props = {
  benefits: { title: string }[]
  setBenefits: (benefits: { title: string }[]) => void
  prerequisites: { title: string }[]
  setPrerequisites: (prerequisites: { title: string }[]) => void
  active: number
  setActive: (active: number) => void
}

const CourseData: React.FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits]
    updatedBenefits[index].title = value
    setBenefits(updatedBenefits)
  }
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }])
  }

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisties = [...prerequisites]
    updatedPrerequisties[index].title = value
    setPrerequisites(updatedPrerequisties)
  }

  const handlePrerequisite = (e: any) => {
    setPrerequisites([...prerequisites, { title: "" }])
  }

  const prevButton = () => {
    setActive(active - 1)
  }
  const handleOption = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1)
    } else {
      toast.error("Please fill the fields for go to next!")
    }
  }
  return (
    <div className="w-[85%] max-w-5xl mx-auto mt-16 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
        Course Details
      </h2>

      <div className="mb-8">
        <label className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          What are the benefits for students in this course?
        </label>
        <div className="space-y-3">
          {benefits.map((benefit: any, index: number) => (
            <div key={index} className="relative">
              <input
                type="text"
                name="Benefit"
                placeholder="You will be able to build a full stack LMS Platform..."
                className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200 pr-10`}
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                {index + 1}
              </span>
            </div>
          ))}
          <div
            onClick={handleAddBenefit}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200 mt-2 group"
          >
            <AddCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Add Another Benefit</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          What are the Prerequisites for starting this course?
        </label>
        <div className="space-y-3">
          {prerequisites.map((prerequisite: any, index: number) => (
            <div key={index} className="relative">
              <input
                type="text"
                name="Prerequisite"
                placeholder="You need basic knowledge of MERN stack"
                className={`${styles.input} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200 pr-10`}
                value={prerequisite.title}
                onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                {index + 1}
              </span>
            </div>
          ))}
          <div
            onClick={handlePrerequisite}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200 mt-2 group"
          >
            <AddCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Add Another Prerequisite</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={prevButton}
          className="w-full sm:w-auto px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Previous Step
        </button>
        <button
          onClick={handleOption}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2"
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CourseData
