"use client"
import { styles } from "@/app/styles/style"
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi"
import type React from "react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineDelete } from "react-icons/ai"
import { HiMinus, HiPlus } from "react-icons/hi"
import { IoMdAddCircleOutline } from "react-icons/io"

type Props = {}

const EditFaq: React.FC<Props> = ({}) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  })

  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation()
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    console.log("FULL DATA:", data) // ✅ Debug output

    if (data?.layout?.faq) {
      setQuestions(data.layout.faq)
    }

    if (layoutSuccess) {
      refetch()
      toast.success("FAQ Updated successfully!")
    }

    if (error && "data" in error) {
      const errorData = error as any
      toast.error(errorData?.data?.message)
    }
  }, [data, layoutSuccess, error, refetch])

  const toggleQuestion = (id: any) => {
    setQuestions((prev) => prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q)))
  }

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prev) => prev.map((q) => (q._id === id ? { ...q, question: value } : q)))
  }

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prev) => prev.map((q) => (q._id === id ? { ...q, answer: value } : q)))
  }

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
        _id: Date.now().toString(), // fallback key
        active: true,
      },
    ])
  }

  const areQuestionsUnchanged = (originalQuestions: any[], newQuestions: any[]) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions)
  }

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "")
  }

  const handleEdit = async () => {
    if (!areQuestionsUnchanged(data.layout.faq, questions) && !isAnyQuestionEmpty(questions)) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading FAQs...</p>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoMdAddCircleOutline className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">No FAQs found.</p>
          <button
            onClick={newFaqHandler}
            className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add First FAQ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Edit FAQ Section</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Manage your frequently asked questions and answers</p>
      </div>

      {/* FAQ Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="space-y-6">
            {questions.map((q: any, index: number) => (
              <div
                key={q._id || index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-900/50">
                  <button
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <div className="flex-1 mr-6">
                      <input
                        className={`${styles.input} border-none bg-transparent w-full text-xl font-medium placeholder-gray-400`}
                        value={q.question}
                        onChange={(e: any) => handleQuestionChange(q._id, e.target.value)}
                        placeholder="Add your question..."
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-base text-gray-500 dark:text-gray-400">
                        {q.active ? "Collapse" : "Expand"}
                      </span>
                      <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                        {q.active ? (
                          <HiMinus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <HiPlus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                {q.active && (
                  <div className="p-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Answer
                        </label>
                        <input
                          className={`${styles.input} border-none w-full text-lg`}
                          value={q.answer}
                          onChange={(e: any) => handleAnswerChange(q._id, e.target.value)}
                          placeholder="Add your answer..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setQuestions((prevQuestion) => prevQuestion.filter((item) => item._id !== q._id))
                          }}
                          className="inline-flex items-center px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <AiOutlineDelete className="w-5 h-5 mr-2" />
                          Delete FAQ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add New FAQ Button */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={newFaqHandler}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <IoMdAddCircleOutline className="w-6 h-6 mr-3" />
              Add New FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 ${
            areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions)
              ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          }`}
          onClick={
            areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions) ? () => null : handleEdit
          }
          disabled={areQuestionsUnchanged(data.layout.faq, questions) || isAnyQuestionEmpty(questions)}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditFaq
