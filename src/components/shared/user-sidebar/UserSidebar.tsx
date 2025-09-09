/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import user from "@/assets/dashboard/user.png";
import {
  IoBagOutline,
  IoBagSharp,
  IoCalendarClearOutline,
} from "react-icons/io5";
import { FaCircleCheck, FaHashtag } from "react-icons/fa6";
import {
  MdOutlineCheckCircleOutline,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineWatchLater,
} from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { PiGenderMaleBold } from "react-icons/pi";
import { IoMdFemale } from "react-icons/io";
import { BiMessageError } from "react-icons/bi";
import { GrStatusWarning } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/utils/receiveUserData";
export default function UserSidebar() {
  const [userData, setUserData] = useState<any>(getUserData());
  console.log("user data ", userData);
  useEffect(() => {
    const handleUserUpdate = () => {
      setUserData(getUserData());
    };

    window.addEventListener("userDataUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userDataUpdated", handleUserUpdate);
    };
  }, []);
  return (
    <div className="flex justify-end">
      <div className="h-[850px] bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg">
        <Image src={user} alt="" height={80} width={80} />

        <div className="flex justify-between items-center mt-3">
          <h2 className="text-xl font-bold text-white">{userData?.name}</h2>
          <div className="flex gap-2">
            <FaCircleCheck className="text-lg text-white" />
            <IoBagSharp className="text-lg text-white" />
          </div>
        </div>
        <p className="text-sm font-me text-secondary border-b border-secondary pb-3">
          <span className="text-warning">VOXA Gold</span>- End in 26 Oct,2025
        </p>
        <div className="pt-2 border-b pb-3 border-secondary">
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlineLocationOn className="text-2xl" />
            <p className="text-secondary font-medium text-sm">
              Berlin, Germany
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <FaHashtag className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              User ID: {userData?.id}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <IoCalendarClearOutline className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              Age: {userData?.age || 0}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlineWatchLater className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              {userData?.createdAt}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <MdOutlinePhone className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              Phone:{" "}
              {userData?.phoneNumber ? userData?.phoneNumber : "+8823-xxxxxxx"}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <FiMail className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              Email: {userData?.email}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <PiGenderMaleBold className="text-xl" />
            <p className="text-secondary font-medium text-sm">
              Gender: {userData?.gender}
            </p>
          </div>
          <div className="flex gap-2 my-1 items-center text-secondary">
            <IoMdFemale className="text-2xl" />
            <p className="text-secondary font-medium text-sm">
              Interested In: {userData?.interestedIn}
            </p>
          </div>
        </div>

        <div className="pt-3">
          <div className="flex justify-between">
            <div className="flex text-secondary gap-1 items-center">
              <MdOutlineCheckCircleOutline className="text-xl" />
              <p className="text-sm font-medium">
                ID Verified: {userData?.isVerified ? "Yes" : "No"}
              </p>
            </div>
            <p className="text-sm font-bold cursor-pointer text-primary underline">
              Download Doc
            </p>
          </div>
        </div>
        <div className="flex items-center border-b border-secondary  pb-3 gap-1 text-secondary text-sm ">
          <IoBagOutline className="text-xl" />
          <p>
            Income Verified: {userData?.isIncomeImageVisible ? "Yes" : "No"}
          </p>
        </div>
        <div className="pt-3">
          <p className="text-secondary text-sm">
            Profile Photos: {userData?.profileImages.length}
          </p>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {userData?.profileImages.map((image: string, idx: string) => (
              <Image
                referrerPolicy="no-referrer"
                key={idx}
                src={image}
                height={54}
                width={54}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="py-3 border-b border-secondary pb-3">
          <h3 className="text-secondary text-sm font-bold">Bio:</h3>
          <p className="font-medium text-secondary text-sm">
            {userData?.bio
              ? userData?.bio
              : "Trust me, I m a billionaire, in Dogecoin XD! #aquarius"}
          </p>
        </div>
        <div className="pt-3">
          <h3 className="text-sm text-secondary font-bold">
            User Flag History
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-sm text-secondary">
                <BiMessageError className="text-xl" />
                <p>Voice Note Flagged: 6</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-secondary">
                <GrStatusWarning className="text-xl" />
                <p>Prior Warnings: {userData?.warningCount}</p>
              </div>
            </div>

            <div className="text-secondary text-center text-sm">
              {/* <p>Flag rate</p>
            <h2 className='text-base font-bold'>71%</h2> */}
            </div>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="border !border-secondary mt-3 !text-white font-bold"
        >
          View in Voice Moderation
        </Button>
      </div>
    </div>
  );
}
