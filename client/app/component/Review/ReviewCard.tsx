import Ratings from "@/app/utils/Ratings"
import Image from "next/image"
import type React from "react"

type Props = {
  item: any
}

const ReviewCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={item.avatar || "/placeholder.svg"}
            alt="image"
            height={50}
            width={50}
            className="rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        <div className="md:flex justify-between w-full hidden">
          <div className="flex-1">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h5>
            <h6 className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.profession}</h6>
          </div>
          <div className="flex-shrink-0 ml-4">
            <Ratings rating={5} />
          </div>
        </div>

        <div className="md:hidden justify-between w-full flex flex-col">
          <div className="mb-3">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h5>
            <h6 className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.profession}</h6>
          </div>
          <Ratings rating={4.5} />
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 text-6xl text-blue-100 dark:text-blue-900 font-serif leading-none"></div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-8 relative z-10 italic">{item.comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard
