import Image from "next/image"
import type React from "react"
import ReviewCard from '../Review/ReviewCard'

type Props = {}

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack Developer | Quarter Ltd.",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer systems engineering student | Zimbabwe",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur unde ad facere accusamus sed. Laborum maiores labore quod non distinctio.",
  },
]

const Reviews: React.FC<Props> = ({}) => {
  return (
    <div className="w-[90%] md:w-[85%] m-auto py-16">
      <div className="w-full md:flex items-center mb-16">
        <div className="md:w-[50%] w-full mb-8 md:mb-0">
          <div className="relative group">
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>

            {/* Main image container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-blue-900 dark:via-gray-800 dark:to-purple-900 p-1">
              <div className="relative overflow-hidden rounded-[22px] bg-white dark:bg-gray-800">
                <Image
                  src="/bussnesImage.png"
                  alt="image"
                  width={700}
                  height={700}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full shadow-lg"></div>
              </div>
            </div>

           
          
          </div>
        </div>

        <div className="w-full md:w-[50%] md:pl-12">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Student Reviews
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Our Students Are{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Strength
              </span>
              <br />
              See what They Say About Us
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, nemo? Quas accusamus suscipit impedit ipsa
            amet minus nisi facere doloremque. Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Nisi, facere.
          </p>

          <div className="mt-8 flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8 md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  )
}

export default Reviews
