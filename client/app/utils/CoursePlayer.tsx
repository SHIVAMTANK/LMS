"use client"

import { useEffect, useState ,useCallback} from "react"
import axios from "axios"
import { Loader2, AlertCircle } from "lucide-react"

type Props = {
  videoUrl: string
  title:string
}

const CoursePlayer: React.FC<Props> = ({ videoUrl,title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

 

  const fetchVideo = useCallback(() => {
    setLoading(true)
    setError(false)

    axios
      .post(
        "http://localhost:5000/api/v1/course/getVdoCipherOTP",
        { videoId: videoUrl },
        { withCredentials: true },
      )
      .then((res) => {
        setVideoData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [videoUrl])

  useEffect(() => {
    fetchVideo()
  }, [fetchVideo])

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white space-y-3">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p>Failed to load video</p>
          <button
            onClick={fetchVideo}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=2ekHHp2VmVgklJM2`}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          allow="encrypted-media"
        />
      )}
    </div>
  )
}

export default CoursePlayer
