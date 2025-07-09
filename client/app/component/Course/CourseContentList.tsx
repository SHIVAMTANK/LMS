"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

interface CourseContentListProps {
  data: any[];
  activeVideo: number | null;
  setActiveVideo: ((index: number) => void) | null;
  isDemo?: boolean;
}

const CourseContentList: React.FC<CourseContentListProps> = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo = false,
}) => {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());

  let totalCount = 0;
  const videoSections = [
    ...new Set(data.map((item: any) => item.videoSection)),
  ];

  const toggleSection = (section: string) => {
    setVisibleSections((prevVisibleSections) => {
      const newVisibleSections = new Set(prevVisibleSections);
      if (newVisibleSections.has(section)) {
        newVisibleSections.delete(section);
      } else {
        newVisibleSections.add(section);
      }
      return newVisibleSections;
    });
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}.${Math.floor((remainingMinutes / 60) * 100)
      .toString()
      .padStart(2, "0")} hours`;
  };

  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="space-y-0">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Course Overview
        </h2>

        {videoSections.map((section: string, sectionIndex: number) => {
          const isSectionVisible = visibleSections.has(section);
          const sectionVideos = data.filter(
            (item: any) => item.videoSection === section
          );
          const sectionVideoCount = sectionVideos.length;
          const sectionVideoLength = sectionVideos.reduce(
            (total: number, item: any) => total + (item.videoLength || 0),
            0
          );
          const sectionStartIndex = totalCount;
          totalCount += sectionVideoCount;

          return (
            <div
              key={section}
              className="border-b border-gray-700 last:border-b-0"
            >
              <button
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-800/30 transition-colors"
                onClick={() => toggleSection(section)}
              >
                <div className="flex-1">
                  <h3 className="text-base font-normal text-white mb-1">
                    {section}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {sectionVideoCount} Lesson
                    {sectionVideoCount !== 1 ? "s" : ""} •{" "}
                    {formatTime(sectionVideoLength)}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {isSectionVisible ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isSectionVisible && (
                <div className="pb-4 ml-4">
                  {sectionVideos.map((item: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index;
                    const isActive = activeVideo === videoIndex;

                    return (
                      <div
                        key={item._id || index}
                        onClick={() =>
                          isDemo ? null : setActiveVideo?.(videoIndex)
                        }
                        className={`flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-800/20 transition-colors ${
                          isActive ? "bg-gray-800/40" : ""
                        }`}
                      >
                        <Play className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-white text-sm block truncate">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm flex-shrink-0">
                          {item.videoLength} minutes
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseContentList;
