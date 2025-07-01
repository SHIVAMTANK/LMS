"use client"

import type React from "react"
import { useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { MdOutlineOndemandVideo } from "react-icons/md"

type Props = {
  data: any
  activeVideo?: number
  setActiveVideo?: any
  isDemo?: boolean
}

const CourseContentList: React.FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Get unique video sections
  const videoSections: string[] = [...new Set<string>(data?.map((item: any) => item.videoSection))]

  let totalCount = 0 // Initialize video counter for indexing

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections)
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section)
    } else {
      newVisibleSections.add(section)
    }
    setVisibleSections(newVisibleSections)
  }

  // Format time function
  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} seconds`
    } else if (minutes < 60) {
      return `${Math.round(minutes)} minutes`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = Math.round(minutes % 60)
      return `${hours} hour${hours > 1 ? "s" : ""}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""}`
    }
  }

  return (
    <div
      className={`w-full ${
        isDemo ? "ml-[-30px] min-h-screen sticky top-24 left-0 z-30 px-6 py-4 bg-white dark:bg-gray-900 shadow-lg" : ""
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section)
        const sectionVideos = data.filter((item: any) => item.videoSection === section)
        const sectionVideoCount = sectionVideos.length
        const sectionVideoLength = sectionVideos.reduce((total: number, item: any) => total + item.videoLength, 0)
        const sectionStartIndex = totalCount
        totalCount += sectionVideoCount
        const sectionContentHours = sectionVideoLength / 60

        return (
          <div
            key={section}
            className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            <div
              className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              {/* Section header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section}</h2>
                <button
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSection(section)
                  }}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
                  ) : (
                    <BsChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{sectionVideoCount} Lessons</span>
                <span className="mx-2">•</span>
                <span>{formatTime(sectionVideoLength / 60)}</span>
              </div>
            </div>

            {isSectionVisible && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index
                  const contentLength: number = item.videoLength / 60
                  const isActive = activeVideo === videoIndex

                  return (
                    <div
                      key={item._id}
                      onClick={() => (isDemo ? null : setActiveVideo(videoIndex))}
                      className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                        isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <MdOutlineOndemandVideo
                            size={22}
                            className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-cyan-600 dark:text-cyan-400"}`}
                          />
                        </div>
                        <h1
                          className={`text-sm font-medium ${
                            isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {formatTime(contentLength)}
                      </h5>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CourseContentList
