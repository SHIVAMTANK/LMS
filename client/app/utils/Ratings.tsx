import type React from "react"
import { Star, StarHalf } from "lucide-react"

type Props = {
  rating: number
}

const Ratings: React.FC<Props> = ({ rating }) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400 transition-all duration-200 hover:fill-yellow-500 hover:text-yellow-500 hover:scale-110 cursor-pointer"
        />,
      )
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalf
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400 transition-all duration-200 hover:fill-yellow-500 hover:text-yellow-500 hover:scale-110 cursor-pointer"
        />,
      )
    } else {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600 transition-all duration-200 hover:text-yellow-400 hover:scale-110 cursor-pointer"
        />,
      )
    }
  }

  return (
    <div className="flex items-center space-x-0.5 sm:space-x-1">
      <div className="flex items-center space-x-0.5">{stars}</div>
      <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
        ({rating.toFixed(1)})
      </span>
    </div>
  )
}

export default Ratings
