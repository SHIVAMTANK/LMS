"use client";

import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "@/app/utils/Ratings";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Award,
  Code,
  Shield,
  Infinity,
  Play,
  Clock,
  Video,
  Download,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: any;
};

const CourseDetail: React.FC<Props> = ({
  data,
  stripePromise,
  clientSecret,
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});

  const user = userData?.user;

  const [open, setOpen] = useState(false);

  const [activeVideo, setActiveVideo] = useState(0);

  const discountPercentage =
    ((data.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Course Header */}
        <div className="mb-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Online Course
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {data.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Ratings rating={data.ratings} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    ({data.reviews?.length} Reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {data.purchased} Students
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  What you will learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {data.benefits && data.benefits.length > 0 ? (
                    data.benefits.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <IoCheckmarkDoneOutline
                            size={18}
                            className="text-green-600 dark:text-green-400"
                          />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No specific learning outcomes listed
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {data.prerequisites && data.prerequisites.length > 0 ? (
                    data.prerequisites.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <IoCheckmarkDoneOutline
                            size={18}
                            className="text-blue-600 dark:text-blue-400"
                          />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No prerequisites required
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-md flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {data.description ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                  </p>
                  Course Stats
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>
                      {data?.courseData?.length || 0} Lesson
                      {(data?.courseData?.length || 0) !== 1 ? "s" : ""}
                    </span>
                    <span>•</span>
                    <span>
                      {data?.courseData?.reduce(
                        (total: number, item: any) =>
                          total + (item.videoLength || 0),
                        0
                      ) || 0}{" "}
                      minutes
                    </span>
                  </div>
                  {/* Sample Video Entry */}
                  {data?.demoUrl && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
                      <Play className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-900 dark:text-white text-sm">
                          Course Preview
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Preview
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Content - Updated */}
            {/* <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <CourseContentList
                  data={data?.courseData}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  isDemo={!isPurchased}
                />
              </CardContent>
            </Card> */}

            {/* Reviews Section - Lighter Design */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                    <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  Student Reviews
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Ratings rating={data?.ratings} />
                  <span className="font-medium">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                  </span>
                  <span>•</span>
                  <span>{data?.reviews?.length || 0} Reviews</span>
                </div>
              </CardHeader>
              <CardContent>
                {data?.reviews?.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {data.reviews
                      .slice(0, 3)
                      .map((item: any, index: number) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">
                                {item.user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                  {item.user.name}
                                </h5>
                                <div className="flex items-center gap-1">
                                  <Ratings rating={item.rating} />
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                {item.comment}
                              </p>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                {format(item.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {data.reviews.length > 3 && (
                      <div className="text-center pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm bg-transparent"
                        >
                          View All {data.reviews.length} Reviews
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No reviews yet. Be the first to review this course!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Preview */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video">
                      <CoursePlayer
                        videoUrl={data?.demoUrl}
                        title={data?.title}
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/70 text-white border-0 text-xs">
                        <Video className="w-3 h-3 mr-1" />
                        Preview
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {data.price === 0 ? "Free" : `$${data.price}`}
                      </span>
                      {data.price > 0 && (
                        <div className="text-center">
                          <div className="text-lg text-gray-500 line-through">
                            ${data.estimatedPrice}
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            {discountPercentagePrice}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {isPurchased ? (
                      <Button
                        asChild
                        className="w-full h-12 text-base font-semibold"
                        size="lg"
                      >
                        <Link href={`/course-access/${data._id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Enter Course
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleOrder}
                        className="w-full h-12 text-base font-semibold"
                        size="lg"
                      >
                        Buy Now - ${data.price}
                      </Button>
                    )}
                  </div>

                  <Separator />

                  {/* Course Features */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      This course includes:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Source code included
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Infinity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Full lifetime access
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Certificate of completion
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Premium Support
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Downloadable resources
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="bg-white w-[500px] min-h-[500px] rounded-xl shadow p-3">
              <div className="flex w-full justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-fu">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetail;
