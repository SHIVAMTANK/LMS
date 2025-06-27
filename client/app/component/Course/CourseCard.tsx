import Ratings from "@/app/utils/Ratings"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { AiOutlineUnorderedList } from "react-icons/ai"

type Props = {
  item: any
  isProfile?: boolean
}

const ComponentName: React.FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`} className="group block">
      <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-purple-500/10 backdrop-blur-sm">
        {/* Course Image */}
        <div className="relative rounded-xl overflow-hidden mb-4">
          <Image
            width={500}
            height={300}
            src={item.thumbnail?.url || "/placeholder.svg?height=300&width=500"}
            alt="Course Image"
            className="rounded-xl w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Course Title */}
        <h1 className="font-bold text-lg text-black dark:text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {item.name}
        </h1>

        {/* Rating and Students */}
        <div className="mb-4 space-y-2">
          <Ratings rating={item.rating} />
          <h5 className={`text-sm text-gray-600 dark:text-gray-400 ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>

        {/* Price and Lectures Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Price Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {item.price === 0 ? <span className="text-green-500">Free</span> : `$${item.price}`}
            </h3>
            {item.estimatedPrice && item.estimatedPrice > item.price && (
              <h5 className="text-sm text-gray-500 line-through">${item.estimatedPrice}</h5>
            )}
          </div>

          {/* Lectures Info */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <AiOutlineUnorderedList size={18} />
            <h5 className="text-sm font-medium">{item.courseData?.length || 0} Lectures</h5>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ComponentName
