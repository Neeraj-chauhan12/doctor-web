import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { healthcareCategories } from "@/lib/contants";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const LandingHero = () => {

  const isAuthenticate=false;
  const router=useRouter();

  const handleBookConsultation=()=>{
     if(isAuthenticate){
      router.push('/doctor-list')
     }else{
      router.push('/signup/patient')
     }
  }

  const handleCategories = (categories:string) => {
    if(isAuthenticate){
      router.push(`/doctor-list?category=${categories}`)
    }else{
      router.push('/login/doctor')
    }
  };
  return (
    <>
      <div className="h-screen container max-w-screen bg-blue-50 flex justify-center items-center">
        <div className="flex justify-center items-center   flex-col">
          <h1 className="text-3xl md:text-7xl font-semibold w-[80vw] md:w-[50vw] text-blue-900 text-center ">
            The place where doctors listen - to you
          </h1>
          <p className="text-black w-[70vw] md:w-[50vw] mt-5 text-center">
            Online primary care that's affordable with or without insurance .
            Quality healthcare, accessible anytime, anywhere.
          </p>

          <div className="flex md:flex-row flex-col gap-4 md:gap-7 mt-5 ">
            <Link href={"/login/patient"}>
              <Button
                variant={"ghost"}
                className="px-14 bg-blue-600 font-medium text-white hover:bg-blue-800 rounded-3xl hover:text-blue-700"
              >
                Book a video visit
              </Button>
            </Link>

            <Link href={"/login/doctor"}>
              <Button
                variant={"ghost"}
                className="px-14 rounded-3xl border-2 border-blue-400"
              >
                Login as Doctor
              </Button>
            </Link>
          </div>

          {/* healcare categories */}
          <div className="flex mt-12 w-screen justify-center items-center overflow-x-scroll gap-5 scrollbar-hidden">
            {healthcareCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategories(item.title)}
                className="flex flex-col items-center min-w-[100px]"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-2xl flex justify-center items-center group-hover:shadow-2xl transition-all duration-200`}
                >
                  <svg
                    className="h-6 w-6 text-white "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <span className="text-xs mt-2 font-medium text-blue-950 text-center">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* trusted indicators */}
          <div className="items-center flex flex-col gap-3 md:flex-row md:gap-9 mt-10">
            <div className="flex items-center">
              <h1 className="h-2 w-2 bg-green-500 mx-2 rounded-full"></h1>
              <h1>500+ Certified Doctors</h1>
            </div>
            <div className="flex items-center">
              <h1 className="h-2 w-2 bg-green-500 mx-2 rounded-full"></h1>
              <h1>50,000+ Satisfied patients</h1>
            </div>
            <div className="flex items-center">
              <h1 className="h-2 w-2 bg-green-500 mx-2 rounded-full"></h1>
              <h1>24/7 Available</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHero;
