"use client"

import type React from "react"
import { useState } from "react"
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { BsLink45Deg, BsPencil } from "react-icons/bs"
import toast from "react-hot-toast"

type Props = {
  active: number
  setActive: (active: number) => void
  courseContentData: any
  setCourseContentData: (courseContentData: any) => void
  handleSubmit: any
}

const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false))
  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData]
    updatedData[index].links.splice(linkIndex, 1)
    setCourseContentData(updatedData)
  }

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed]
    updatedCollasped[index] = !updatedCollasped[index]
    setIsCollapsed(updatedCollasped)
  }

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData]
    updateData[index].links.push({ title: "", url: "" })
    setCourseContentData(updateData)
  }

  const newContentHandler = (item: any) => {
    // **UPDATED: Added proper null/undefined checks**
    if (
      !item ||
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      !item.links ||
      !Array.isArray(item.links) ||
      item.links.length === 0 ||
      !item.links[0] ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!")
    } else {
      let newVideoSection = ""

      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection

        if (lastVideoSection) {
          newVideoSection = lastVideoSection
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      }
      setCourseContentData([...courseContentData, newContent])
    }
  }

  const addNewSection = () => {
    // **UPDATED: Added proper null/undefined checks**
    const lastItem = courseContentData[courseContentData.length - 1]
    if (
      !lastItem ||
      lastItem.title === "" ||
      lastItem.description === "" ||
      lastItem.videoUrl === "" ||
      !lastItem.links ||
      !Array.isArray(lastItem.links) ||
      lastItem.links.length === 0 ||
      !lastItem.links[0] ||
      lastItem.links[0].title === "" ||
      lastItem.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!")
    } else {
      setActiveSection(activeSection + 1)
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      }
      setCourseContentData([...courseContentData, newContent])
    }
  }

  const prevButton = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    // **UPDATED: Added proper null/undefined checks**
    const lastItem = courseContentData[courseContentData.length - 1]
    if (
      !lastItem ||
      lastItem.title === "" ||
      lastItem.description === "" ||
      lastItem.videoUrl === "" ||
      !lastItem.links ||
      !Array.isArray(lastItem.links) ||
      lastItem.links.length === 0 ||
      !lastItem.links[0] ||
      lastItem.links[0].title === "" ||
      lastItem.links[0].url === ""
    ) {
      toast.error("section can't be empty!")
    } else {
      setActive(active + 1)
      handleCourseSubmit()
    }
  }

  return (
    <div className="w-[85%] max-w-5xl mx-auto mt-16 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
        Course Content
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
          // **UPDATED: Added null check for item**
          if (!item) return null

          return (
            <div key={index} className="space-y-4">
              <div
                className={`w-full bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 shadow-sm ${
                  showSectionInput ? "mt-8" : "mt-4"
                }`}
              >
                {showSectionInput && (
                  <div className="mb-6">
                    <div className="flex w-full items-center gap-2">
                      <input
                        type="text"
                        className={`text-xl font-semibold ${
                          item.videoSection === "Untitled Section" ? "w-44" : "w-auto min-w-0"
                        } font-medium cursor-pointer text-gray-800 dark:text-white bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-all duration-200`}
                        value={item.videoSection || ""}
                        onChange={(e) => {
                          const updateData = [...courseContentData]
                          updateData[index].videoSection = e.target.value
                          setCourseContentData(updateData)
                        }}
                      />
                      <BsPencil className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200" />
                    </div>
                  </div>
                )}

                <div className="flex w-full items-center justify-between mb-4">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-medium text-gray-800 dark:text-white">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center gap-2">
                    <AiOutlineDelete
                      className={`text-xl ${
                        index > 0
                          ? "cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          : "cursor-not-allowed text-gray-400 dark:text-gray-600"
                      } transition-colors duration-200`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData]
                          updatedData.splice(index, 1)
                          setCourseContentData(updatedData)
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      className="text-2xl text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                      style={{
                        transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index].title = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Video URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/video..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200"
                        value={item.videoUrl || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index].videoUrl = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Video Description
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Describe what this video covers..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200 resize-vertical"
                        value={item.description || ""}
                        onChange={(e) => {
                          const updatedData = [...courseContentData]
                          updatedData[index].description = e.target.value
                          setCourseContentData(updatedData)
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Resource Links</h4>
                      {/* **UPDATED: Added proper null checks for links array** */}
                      {item?.links &&
                        Array.isArray(item.links) &&
                        item.links.map((link: any, linkIndex: number) => (
                          <div
                            key={linkIndex}
                            className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Link {linkIndex + 1}
                              </label>
                              <AiOutlineDelete
                                className={`text-lg ${
                                  linkIndex === 0
                                    ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                                    : "cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                } transition-colors duration-200`}
                                onClick={() => (linkIndex === 0 ? null : handleRemoveLink(index, linkIndex))}
                              />
                            </div>
                            <div className="space-y-3">
                              <input
                                type="text"
                                placeholder="Source Code... (Link title)"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200"
                                value={link?.title || ""}
                                onChange={(e) => {
                                  const updatedData = [...courseContentData]
                                  if (updatedData[index].links[linkIndex]) {
                                    updatedData[index].links[linkIndex].title = e.target.value
                                    setCourseContentData(updatedData)
                                  }
                                }}
                              />
                              <input
                                type="url"
                                placeholder="https://github.com/... (Link URL)"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm transition-all duration-200"
                                value={link?.url || ""}
                                onChange={(e) => {
                                  const updatedData = [...courseContentData]
                                  if (updatedData[index].links[linkIndex]) {
                                    updatedData[index].links[linkIndex].url = e.target.value
                                    setCourseContentData(updatedData)
                                  }
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>

                    <div
                      onClick={() => handleAddLink(index)}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200 group"
                    >
                      <BsLink45Deg className="text-lg group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">Add Resource Link</span>
                    </div>
                  </div>
                )}

                {index === courseContentData.length - 1 && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div
                      onClick={(e: any) => newContentHandler(item)}
                      className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 cursor-pointer transition-colors duration-200 group"
                    >
                      <AiOutlinePlusCircle className="text-lg group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">Add New Content</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <div className="pt-6">
          <div
            onClick={() => addNewSection()}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200 group"
          >
            <AiOutlinePlusCircle className="text-xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-lg font-medium">Add New Section</span>
          </div>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => prevButton()}
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
          onClick={() => handleOptions()}
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

export default CourseContent
