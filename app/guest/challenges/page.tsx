"use client";
import ChallengeCard2 from "@/app/components/ChallengeCard2";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
import { useGetChallengesQuery } from "@/lib/redux/slices/challengeSlice";
import Link from "next/link";
import React from "react";
import { VscArrowSmallLeft } from "react-icons/vsc";

const Page = () => {
  const { data, isLoading, error } = useGetChallengesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 bg-[#f9fafb]">
          <div className="flex flex-row items-center space-x-[20px] justify-start lg:px-[100px] lg:pt-[100px] max-md:pt-[30px] max-md:pl-[30px]">
            <div className="animate-pulse h-8 w-8 bg-gray-200 rounded"></div>
            <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-[30px] py-[20px] gap-[20px] px-[40px] place-items-center">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-lg w-[320px] h-[400px]">
                <div className="bg-gray-200 h-[160px] rounded-t-lg"></div>
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen excluded flex flex-col">
        <NavBar />
        <main className="flex-1 bg-[#f9fafb] flex items-center justify-center">
          <div className="text-center excluded">
            <h2 className="text-xl text-red-500 mb-2">Error loading challenges</h2>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className=" excluded flex flex-col">
      <NavBar />
      <main className="flex-1 bg-[#f9fafb]">
        <div className="flex excluded flex-row items-center space-x-[20px] justify-start lg:px-[100px] lg:pt-[100px] max-md:pt-[30px] max-md:pl-[30px]">
          <Link
            href={"/"}
            className="border-[#E4E7EC] border-[1px] p-[3px] rounded-[5px] bg-white"
          >
            <VscArrowSmallLeft className="text-[21px]" />
          </Link>
          <h2 className="text-[#667185] text-[14px]">Go Back</h2>
          <h2 className="flex flex-row items-center justify-center text-[14px] space-x-[4px]">
            <span className="text-[#667185]">/</span>
            <span className="text-[#2B71F0]">Challenges & Hackathons</span>
          </h2>
        </div>
        <div className="overflow-y-auto mb-[30px] excluded h-screen grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-[30px] py-[20px] gap-[20px] px-[40px] place-items-center">
          {data?.map((challenge) => (
            <ChallengeCard2 key={challenge._id} challenge={challenge} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;