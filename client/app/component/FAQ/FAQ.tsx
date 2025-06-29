"use client"

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import type React from "react"
import { useEffect, useState } from "react"

type Props = {}

const FAQ: React.FC<Props> = ({}) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  })

  const [questions, setQuestions] = useState<any[]>([])
  const [activeQuestion, setActiveQuestion] = useState(null)

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq)
    }
  }, [data])

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id)
  }

  return (
    <div className="w-full py-24">
      <div className="w-[90%] md:w-[85%] m-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-base font-medium mb-8">
            Frequently Asked Questions
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Got Questions? We&apos;ve Got{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Answers</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most commonly asked questions about our platform and services.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          /* FAQ Items */
          <div className="max-w-5xl mx-auto space-y-6">
            {questions && questions.length > 0 ? (
              questions.map((item: any, index: number) => (
                <div
                  key={item._id || index}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    className="w-full px-8 py-8 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    onClick={() => toggleQuestion(item._id || index)}
                    aria-expanded={activeQuestion === (item._id || index)}
                  >
                    <span className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white pr-6 leading-relaxed">
                      {item.question}
                    </span>
                    <svg
                      className={`w-8 h-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                        activeQuestion === (item._id || index) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeQuestion === (item._id || index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-8 pt-4">
                      <div className="w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 mb-6"></div>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No FAQ Available</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  FAQ content will be displayed here once it&apos;s available.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ
