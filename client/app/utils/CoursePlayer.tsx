"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Play, Loader2, AlertCircle, Volume2, Maximize, Settings } from "lucide-react"

type Props = {
  videoUrl: string
  title: string
}

const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    axios
      .post(
        "http://localhost:5000/api/v1/course/getVdoCipherOTP",
        {
          videoId: videoUrl,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setVideoData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
      })
  }, [videoUrl])

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-xl sm:rounded-t-2xl overflow-hidden">
      <div className="aspect-video relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="text-center p-4 sm:p-6">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500/30 rounded-full mx-auto"></div>
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 animate-spin absolute top-2 left-1/2 transform -translate-x-1/2" />
              </div>
              <p className="text-white text-base sm:text-lg font-medium mb-2">Loading video...</p>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">{title}</p>
              <div className="flex items-center justify-center space-x-4 mt-4 text-gray-500">
                <Volume2 className="w-4 h-4" />
                <Settings className="w-4 h-4" />
                <Maximize className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 via-gray-800 to-black">
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-red-500/30">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <p className="text-white text-base sm:text-lg font-medium mb-2">Failed to load video</p>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Please check your connection and try again</p>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && videoData.otp && videoData.playbackInfo && (
          <>
            <iframe
              src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=2ekHHp2VmVgklJM2`}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              allow="encrypted-media"
              title={title}
            />
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm sm:text-base lg:text-xl font-semibold truncate mb-1">{title}</h3>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-gray-300">
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Preview</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm">
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>HD</span>
                    </div>
                  </div>
                </div>
                <button className="ml-3 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>
          </>
        )}

        {!loading && !error && (!videoData.otp || !videoData.playbackInfo) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 via-gray-800 to-black">
            <div className="text-center p-4 sm:p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-blue-500/30">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              </div>
              <p className="text-white text-base sm:text-lg font-medium mb-2">Course Preview</p>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed mb-4">{title}</p>
              <div className="flex items-center justify-center space-x-4 text-gray-500">
                <Volume2 className="w-4 h-4" />
                <Settings className="w-4 h-4" />
                <Maximize className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursePlayer
