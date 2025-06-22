"use client";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: React.FC<Props> = ({}) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const { data,refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "");
    }
    if (isSuccess) {
        refetch()
      toast.success("Hero Updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error,refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({ type: "Banner", image, title, subTitle });
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto mt-16 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Edit Hero Section
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your hero section with image, title, and subtitle
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-start">
        {/* Left Side - Image Upload */}
        <div className="flex-1 xl:max-w-2xl">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Hero Image
            </h3>

            <div className="flex justify-center">
              <div className="relative rounded-full h-[450px] w-[450px] lg:h-[500px] lg:w-[500px]">
                <div className="flex items-center justify-center h-full">
                  <div className="relative w-full h-full">
                    <div className="w-full h-full rounded-full border-4 border-dashed border-blue-300 dark:border-blue-500 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 bg-white dark:bg-slate-800 overflow-hidden shadow-lg">
                      {image ? (
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Hero Image"
                          fill
                          className="object-contain rounded-full p-4"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-blue-400 dark:text-blue-300">
                          <AiOutlineCamera className="text-6xl mb-4" />
                          <p className="text-lg font-medium text-center px-4">
                            Upload Hero Image
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Click the camera to get started
                          </p>
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      id="banner"
                      accept="image/*"
                      onChange={handleUpdate}
                      className="hidden"
                    />

                    <label
                      htmlFor="banner"
                      className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 z-20"
                    >
                      <AiOutlineCamera className="text-xl" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Click the camera icon to upload a new hero image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Recommended: Square image (1:1 ratio), PNG or JPG format, max
                5MB
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Title and Subtitle */}
        <div className="flex-1">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 h-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Content Settings
            </h3>

            <div className="space-y-8">
              <div className="group">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200"
                >
                  Hero Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your compelling hero title..."
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm transition-all duration-200 text-lg font-medium placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                      {title.length}/60
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="subtitle"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200"
                >
                  Hero Subtitle
                </label>
                <div className="relative">
                  <textarea
                    id="subtitle"
                    rows={5}
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="Write a captivating subtitle that describes your offering..."
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm transition-all duration-200 resize-none placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="absolute bottom-3 right-3">
                    <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                      {subTitle.length}/200
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              {(title || subTitle) && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Live Preview
                    </h4>
                  </div>
                  <div className="text-center space-y-4">
                    {title && (
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {title}
                      </h1>
                    )}
                    {subTitle && (
                      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                        {subTitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleEdit}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Update Hero Section
        </button>
      </div>
    </div>
  );
};

export default EditHero;
