"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetail from "./CourseDetail";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailPage: React.FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<Promise<
    import("@stripe/stripe-js").Stripe | null
  > | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, createPaymentIntent, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);
  if (isLoading) return <Loader />;

  if (!data || !data.course) {
    return (
      <div className="text-red-500 text-center mt-10">Course not found.</div>
    );
  }

  return (
    <>
      <Heading
        title={`${data.course.name} - Learnex`}
        description={
          "Learnex is a programming community which is developed by Shivam Tank for helping programmers"
        }
        keywords={data.course.tags}
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      {
        stripePromise && (
          <CourseDetail data={data.course} stripePromise={stripePromise} clientSecret = {clientSecret}/>
        )
      }
      <Footer />
    </>
  );
};

export default CourseDetailPage;
