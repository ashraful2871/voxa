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
import { getModerationData } from "@/utils/receivedModerationDetails";
import { usePathname } from "next/navigation";
import { getVerificationData } from "@/utils/receivedVerificationDetails";
import { getReportData } from "@/utils/receivedReportDetails";
import { getSSubscriptionData } from "@/utils/receivedSubscriptionDetails";
import VoiceNotePlayer from "@/utils/VoiceNotePlayer";

export default function UserSidebar() {
  const [userData, setUserData] = useState<any>(getUserData());
  const [moderationDetails, setModerationDetails] = useState<any>(
    getModerationData()
  );
  const [verificationDetails, setVerificationDetails] = useState<any>(
    getVerificationData()
  );
  const [reportDetails, setReportDetails] = useState<any>(getReportData());
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(
    getReportData()
  );

  const pathName = usePathname();
  console.log(pathName);

  console.log(moderationDetails);

  useEffect(() => {
    const handleUserUpdate = () => {
      setUserData(getUserData());
    };

    window.addEventListener("userDataUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userDataUpdated", handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleModerationUpdate = () => {
      setModerationDetails(getModerationData());
    };

    // Listen to the correct event name
    window.addEventListener("moderationDataUpdated", handleModerationUpdate);

    return () => {
      window.removeEventListener(
        "moderationDataUpdated",
        handleModerationUpdate
      );
    };
  }, []);

  useEffect(() => {
    const handleVerificationUpdate = () => {
      setVerificationDetails(getVerificationData());
    };

    // Listen to the correct event name
    window.addEventListener(
      "verificationDataUpdated",
      handleVerificationUpdate
    );

    return () => {
      window.removeEventListener(
        "verificationDataUpdated",
        handleVerificationUpdate
      );
    };
  }, []);

  // report
  useEffect(() => {
    const handleReportUpdate = () => {
      setReportDetails(getReportData());
    };

    // Listen to the correct event name
    window.addEventListener("reportDataUpdated", handleReportUpdate);

    return () => {
      window.removeEventListener("reportDataUpdated", handleReportUpdate);
    };
  }, []);

  // subscription
  useEffect(() => {
    const handleSubscriptionUpdate = () => {
      setSubscriptionDetails(getSSubscriptionData());
    };

    // Listen to the correct event name
    window.addEventListener(
      "subscriptionDataUpdated",
      handleSubscriptionUpdate
    );

    return () => {
      window.removeEventListener(
        "subscriptionDataUpdated",
        handleSubscriptionUpdate
      );
    };
  }, []);

  const verificationUser: any = localStorage.getItem("verificationQueue");

  const verificationUserDetails = JSON.parse(verificationUser);
  console.log(verificationUserDetails);

  return (
    <>
      {pathName === "/admin/user-management" && (
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
              <span className="text-warning">VOXA Gold</span>- End in 26
              Oct,2025
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
                  {userData?.phoneNumber
                    ? userData?.phoneNumber
                    : "+8823-xxxxxxx"}
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
                  <Image key={idx} src={image} height={54} width={54} alt="" />
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
            <Button variant={"outline"} className=" mt-3 !text-white font-bold">
              View in Voice Moderation
            </Button>
          </div>
        </div>
      )}
      {pathName === "/admin/voice-moderation" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={moderationDetails?.sender?.image || user}
              alt="Profile"
              height={80}
              width={80}
              className="rounded-full"
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">
                {moderationDetails?.sender?.name || "VOXA User"}
              </h2>
              <div className="flex gap-2">
                <FaCircleCheck className="text-lg text-white" />
                <IoBagSharp className="text-lg text-white" />
              </div>
            </div>

            {/* Plan */}
            <p className="text-sm font-medium text-secondary border-b border-secondary pb-3">
              <span className="text-warning">
                {moderationDetails?.sender?.voxaPlanType || "Free Plan"}
              </span>
              {" - "}
              {moderationDetails?.sender?.subscriptionUser?.subscriptionEnd
                ? `End: ${new Date(
                    moderationDetails?.sender?.subscriptionUser?.subscriptionEnd
                  ).toLocaleDateString()}`
                : "N/A"}
            </p>

            {/* Scrollable Info */}
            <div className="pt-2 pb-3 border-secondary flex-1 overflow-y-auto">
              {/* Location */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="text-secondary font-medium text-sm">
                  {moderationDetails?.sender?.location || "Unknown Location"}
                </p>
              </div>

              {/* Sent Time */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <FaHashtag className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Sent:{" "}
                  {moderationDetails?.message?.createdAt
                    ? new Date(
                        moderationDetails?.message?.createdAt
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              {/* Recipient */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Recipient: {moderationDetails?.recipientBy || "N/A"}
                </p>
              </div>

              {/* Flag Info */}
              <div className="flex gap-2 my-1 items-center text-secondary  border-b border-secondary pb-3">
                <MdOutlineWatchLater className="text-xl text-warning" />
                <p className="text-secondary font-medium text-sm">
                  Flagged by: {moderationDetails?.flagType || "N/A"} - Detected
                  Aggression
                </p>
              </div>

              {/* Voice Note */}
              <div className="mt-4  border-b border-secondary pb-3">
                <h2 className="text-secondary font-bold text-sm">Voice Note</h2>
                <VoiceNotePlayer src={moderationDetails?.message?.voiceFile} />

                <p className="text-xs text-secondary mt-1">
                  Duration: 2:12 min
                </p>
              </div>

              {/* Flag History */}
              <div className="pt-3  border-b border-secondary pb-3">
                <h3 className="text-sm text-secondary font-bold">
                  User Flag History
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-secondary">
                      <BiMessageError className="text-xl" />
                      <p>
                        Voice Note Flagged:{" "}
                        {moderationDetails?.totalFlagged || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-secondary">
                      <GrStatusWarning className="text-xl" />
                      <p>
                        Prior Warnings:{" "}
                        {moderationDetails?.sender?.warningCount || 1}
                      </p>
                    </div>
                  </div>

                  {/* Circular progress */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className="h-20 w-20 rounded-full flex items-center justify-center text-center text-white"
                      style={{
                        background: `conic-gradient(#E02200 ${
                          moderationDetails?.voiceNoteFlaggedPercentage || 7.1
                        }%, #20201E 0 )`,
                      }}
                    >
                      <div className="h-16 w-16 bg-foreground rounded-full flex flex-col items-center justify-center">
                        <p className="text-[10px] text-secondary">Flag rate</p>
                        <p className="text-sm font-bold">
                          {moderationDetails?.voiceNoteFlaggedPercentage || 7.1}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-2">
              <Button
                variant={"outline"}
                className="!text-[#00E04B] font-bold w-full"
              >
                Mark as Safe
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E08A00] font-bold w-full"
              >
                Issue Warning
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E02200] font-bold w-full"
              >
                Temporary Suspend
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E02200] font-bold w-full"
              >
                Permanent Ban
              </Button>
            </div>
          </div>
        </div>
      )}
      {pathName === "/admin/verifications" && (
        <div className="flex justify-end">
          <div className="bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={verificationDetails?.image || user}
              alt=""
              height={80}
              width={80}
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">
                {verificationDetails?.name || "VOXA User"}
              </h2>
              <div className="flex gap-2">
                <FaCircleCheck className="text-lg text-white" />
                <IoBagSharp className="text-lg text-white" />
              </div>
            </div>

            {/* Plan */}
            <p className="text-sm font-me text-secondary border-b border-secondary pb-3">
              <span className="text-warning">
                {verificationDetails?.voxaPlanType || "Free Plan"}
              </span>
            </p>

            {/* Details Section */}
            <div className="pt-2 pb-3 border- border-secondary space-y-2 ">
              <div className="flex gap-2 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="text-secondary font-medium text-sm">
                  Location: {verificationDetails?.location || "Unknown"}
                </p>
              </div>

              <div className="flex gap-2 items-center text-secondary">
                <FaHashtag className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  User ID: {verificationDetails?.id}
                </p>
              </div>

              <div className="flex gap-2 items-center text-secondary">
                <FaHashtag className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Email: {verificationDetails?.email}
                </p>
              </div>

              <div className="flex gap-2 items-center text-secondary  border-b border-secondary pb-3">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Prior Rejections: {verificationDetails?.priorRejection || 0}
                </p>
              </div>

              <div className="flex gap-2 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Ends:{" "}
                  {verificationDetails?.subscriptionUser?.subscriptionEnd ||
                    "N/A"}
                </p>
              </div>

              {/* Boolean Verifications */}
              <div className="flex gap-2 items-center text-secondary ">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Identity Image Verified:{" "}
                  {verificationDetails?.isIdentityImageVerified ? "Yes" : "No"}
                </p>
              </div>

              <div className="flex gap-2 items-center text-secondary">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Income Image Verified:{" "}
                  {verificationDetails?.isIncomeImageVerified ? "Yes" : "No"}
                </p>
              </div>

              {/* Verification Records */}
              <div className=" border-t border-secondary pt-3">
                <p className="text-secondary font-bold text-sm mb-1">
                  Verification History:
                </p>
                {verificationDetails?.Verification?.length > 0 ? (
                  verificationDetails.Verification.map((v: any) => (
                    <div
                      key={v.id}
                      className="ml-3 border-l border-secondary pl-2 mb-2"
                    >
                      <p className="text-xs text-secondary">Type: {v.type}</p>
                      <p className="text-xs text-secondary">
                        Status: {v.status}
                      </p>
                      <p className="text-xs text-secondary">
                        Created At: {v.createdAt}
                      </p>
                      <p className="text-xs text-secondary">Image:</p>
                      <Image
                        src={v.imageUrl || user}
                        alt=""
                        height={150}
                        width={250}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-secondary ml-3">
                    No verifications yet
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-auto space-y-2  border-t border-secondary pt-3">
              <Button
                variant={"outline"}
                className="!text-[#00E04B] font-bold w-full"
              >
                Approve Verification
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E02200] font-bold w-full"
              >
                Reject Submission
              </Button>
            </div>
          </div>
        </div>
      )}
      {pathName === "/admin/reports" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={reportDetails?.reported?.image || user}
              alt="Profile"
              height={80}
              width={80}
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">
                {reportDetails?.reported?.name || "VOXA User"}
              </h2>
              <div className="flex gap-2">
                <FaCircleCheck className="text-lg text-white" />
                <IoBagSharp className="text-lg text-white" />
              </div>
            </div>

            {/* Plan */}
            <p className="text-sm font-me text-secondary border-b border-secondary pb-3">
              <span className="text-warning">
                {reportDetails?.reported?.voxaPlanType || "Free Plan"}
              </span>
            </p>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pt-2 pb-3 border-secondary">
              {/* Location */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="text-secondary font-medium text-sm">
                  {reportDetails?.reported?.location || "Unknown Location"}
                </p>
              </div>

              {/* Report Reason */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <FaHashtag className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Report Reason: {reportDetails?.reason?.title || "N/A"}
                </p>
              </div>

              {/* Report Status */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Report Status: {reportDetails?.status || "N/A"}
                </p>
              </div>

              {/* Identity Verification */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Identity Verification:{" "}
                  {reportDetails?.reported?.identityVerification?.status ||
                    "N/A"}
                </p>
              </div>

              {/* Income Verification */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Income Verification:{" "}
                  {reportDetails?.reported?.incomeVerification?.status || "N/A"}
                </p>
              </div>

              {/* Subscription Ends */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Ends:{" "}
                  {reportDetails?.reported?.subscriptionUser?.subscriptionEnd ||
                    "N/A"}
                </p>
              </div>

              {/* Reporter Name */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Reported By: {reportDetails?.reporter?.name || "Anonymous"}
                </p>
              </div>

              {/* Report Created Date */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Reported At: {reportDetails?.createdAt || "N/A"}
                </p>
              </div>

              {/* Reviewed Info */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Reviewed By: {reportDetails?.reviewedBy || "Not Reviewed"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Action Taken: {reportDetails?.actions?.[0]?.type || "N/A"}
                </p>
              </div>
            </div>

            {/* Buttons naturally at bottom */}
            <div className="space-y-2">
              <Button
                variant={"outline"}
                className="!text-[#00E04B] font-bold w-full"
              >
                Approve Verification
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E02200] font-bold w-full"
              >
                Reject Submission
              </Button>
            </div>
          </div>
        </div>
      )}
      {pathName === "/admin/subscriptions" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={subscriptionDetails?.image || user}
              alt="User Avatar"
              height={80}
              width={80}
              className="rounded-full object-cover"
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">
                {subscriptionDetails?.name || "Ropolod263"}
              </h2>
              <div className="flex gap-2">
                <FaCircleCheck className="text-lg text-white" />
                <IoBagSharp className="text-lg text-white" />
              </div>
            </div>

            {/* Plan */}
            <p className="text-sm font-me text-secondary border-b border-secondary pb-3">
              <span className="text-warning">
                {subscriptionDetails?.voxaPlanType || "VOXA_Gold"}
              </span>
            </p>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pt-2 pb-3 border-secondary">
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="text-secondary font-medium text-sm">
                  {subscriptionDetails?.location || "Unknown Location"}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <FaHashtag className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Email:{" "}
                  {subscriptionDetails?.email || "ropolod263@iotrama.com"}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Identity Verified:{" "}
                  {subscriptionDetails?.isIdentityImageVerified === true
                    ? "Yes"
                    : subscriptionDetails?.isIdentityImageVerified === false
                    ? "No"
                    : "N/A"}
                  {/* true → Yes */}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Income Verified:{" "}
                  {subscriptionDetails?.isIncomeImageVerified === true
                    ? "Yes"
                    : subscriptionDetails?.isIncomeImageVerified === false
                    ? "No"
                    : "N/A"}
                  {/* false → No */}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Plan:{" "}
                  {subscriptionDetails?.subscriptionUser
                    ?.subscriptionPlanType || "ANNUAL"}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Status:{" "}
                  {subscriptionDetails?.subscriptionUser?.subscriptionStatus ||
                    "active"}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Start:{" "}
                  {subscriptionDetails?.subscriptionUser?.subscriptionStart ||
                    "2025-09-03T08:40:55.000Z"}
                </p>
              </div>

              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Subscription Ends:{" "}
                  {subscriptionDetails?.subscriptionUser?.subscriptionEnd ||
                    "2026-09-03T08:40:55.000Z"}
                </p>
              </div>
            </div>

            {/* Buttons at bottom */}
            <div className="space-y-2">
              <Button
                variant={"outline"}
                className="!text-[#00E04B] font-bold w-full"
              >
                Approve Verification
              </Button>
              <Button
                variant={"outline"}
                className="!text-[#E02200] font-bold w-full"
              >
                Reject Submission
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
