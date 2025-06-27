import { Search, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"

const Hero = () => {
  const userAvatars = [
    { id: 1, name: "John", src: "/woman.png" },
    { id: 2, name: "Sarah", src: "/man.png" },
    { id: 3, name: "Mike", src: "/hacker.png" },
  ]

  const { data, refetch } = useGetHeroDataQuery("Banner", {})

  return (
    <div className="min-h-screen text-black dark:text-white font-inter relative">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content wrapper */}
      <div className="max-w-[1600px] mx-auto px-6 pt-20 lg:pt-28 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1.2fr] gap-30 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in text-base lg:text-3xl xl:text-xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all duration-300">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
              <span>Trusted by 500k+ students</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in delay-200 text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 hover:scale-105">
                {data?.layout?.banner?.title || "Improve Your Online Learning Experience"}
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl animate-fade-in delay-300">
                {data?.layout?.banner?.subTitle ||
                  "40k+ Online courses & 500k+ registered students. Find your desired courses from them and improve your learning experience instantly."}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md animate-fade-in delay-400">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-14 backdrop-blur-sm transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800/80"
                />
              </div>
              <Button className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg h-10 transition-all duration-300 hover:scale-105">
                Search
              </Button>
            </div>

            {/* Social Proof */}
            <div className="space-y-4 animate-fade-in delay-500">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {userAvatars.map((user, index) => (
                    <Avatar
                      key={user.id}
                      className={`w-10 h-10 border-2 border-white dark:border-gray-800 hover:scale-110 transition-transform duration-200 hover:z-10 relative animate-fade-in`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <AvatarImage src={user.src || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-blue-500 text-white text-sm">{user.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition-transform duration-200 animate-fade-in delay-700">
                    <span className="text-xs text-gray-700 dark:text-gray-300">+50k</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 animate-fade-in delay-800">
                  Join thousands of learners worldwide
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 animate-fade-in delay-900">
                <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors duration-200">
                  <Users className="w-4 h-4" />
                  <span>500k+ Students</span>
                </div>
                <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors duration-200">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800/30 dark:to-gray-900/30 rounded-3xl p-12 lg:p-16 backdrop-blur-sm border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-500 hover:scale-105">
              <div className="aspect-square bg-gray-200 dark:bg-gradient-to-br dark:from-gray-800/20 dark:to-gray-900/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                  <Image
                    src={data?.layout?.banner?.image?.url || "/mainImage.png"}
                    alt="ChatGPT snapshot"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating icons */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-green-500 text-white p-3 rounded-xl shadow-lg animate-bounce hover:scale-110 transition-transform duration-200">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white p-3 rounded-xl shadow-lg animate-bounce delay-1000 hover:scale-110 transition-transform duration-200">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
