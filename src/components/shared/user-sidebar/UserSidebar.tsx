/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import user from "@/assets/dashboard/user.png";
import {
  IoBagOutline,
  IoBagSharp,
  IoCalendarClearOutline,
  IoCalendarNumberOutline,
} from "react-icons/io5";
import { FaCircleCheck, FaHashtag, FaIdCard } from "react-icons/fa6";
import {
  MdEmail,
  MdOutlineCheckCircleOutline,
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineVerifiedUser,
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
import { FaMoneyCheckAlt } from "react-icons/fa";
import {
  useIssuesWarningMutation,
  useMakeSafeMutation,
  useRemoveSuspendAndBannedMutation,
  useVoiceModerationActionMutation,
} from "@/redux/features/userManagement/voiceModerationQueue";
import { toast } from "sonner";
import Link from "next/link";
import { CheckCircle2, User } from "lucide-react";
import { useProcessReportMutation } from "@/redux/features/userManagement/reportsDetailsApi";
import { format } from "date-fns";
import { useApprovedVerificationMutation } from "@/redux/features/userManagement/verification-details";
import { getPlanDetailsData } from "@/utils/receivedPlanDetails";
import {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useEditPlanMutation,
} from "@/redux/features/userManagement/subscriptionPlansapi";

export default function UserSidebar() {
  const [activeSidebar, setActiveSidebar] = useState<
    "plan" | "user" | "add_plan" | null
  >("plan");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(getUserData());
  const [rejectReason, setRejectReason] = useState<string | undefined>();
  const [moderationDetails, setModerationDetails] = useState<any>(
    getModerationData()
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newPlan, setNewPlan] = useState<string | null>(null);
  const [verificationDetails, setVerificationDetails] = useState<any>(
    getVerificationData()
  );
  const [createPlan, { isLoading: CreatePlanLoading }] =
    useCreatePlanMutation();
  const [planDetails, setPlanDetails] = useState<any>(getPlanDetailsData());
  const [makeSafe, { isLoading }] = useMakeSafeMutation();
  const [issueWarning] = useIssuesWarningMutation();
  const [processReport] = useProcessReportMutation();
  const [voiceModerationAction, { isLoading: ModerationLoading }] =
    useVoiceModerationActionMutation();
  const [removeSuspendAndBanned] = useRemoveSuspendAndBannedMutation();
  const [reportDetails, setReportDetails] = useState<any>(getReportData());
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(
    getReportData()
  );

  const [deletePlan] = useDeletePlanMutation();
  const [editPlan] = useEditPlanMutation();
  const [verification] = useApprovedVerificationMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAction, setSelectedAction] = useState<null | string>(null);

  const pathName = usePathname();
  console.log(pathName);

  console.log(planDetails);
  console.log(subscriptionDetails);

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

  // plan details
  useEffect(() => {
    const handlePlanUpdate = () => {
      setPlanDetails(getPlanDetailsData());
    };

    // Listen to the correct event name
    window.addEventListener("planDetailsDataUpdated", handlePlanUpdate);

    return () => {
      window.removeEventListener("planDetailsDataUpdated", handlePlanUpdate);
    };
  }, []);

  const verificationUser: any = localStorage.getItem("verificationQueue");

  const verificationUserDetails = JSON.parse(verificationUser);
  console.log(verificationUserDetails);

  //report- actions make safe
  const handleMakeSafe = async (id: string) => {
    console.log(id);
    const makeSafeData = {
      reportId: id,
    };

    try {
      const res = await makeSafe(makeSafeData);

      if (res?.data?.success) {
        toast.success("Report has been marked as safe");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.success("Report is already dismissed");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something WntWrong");
    }
  };

  //report- issue warning
  const handleIssueWarning = async (id: string) => {
    console.log(id);
    const issueWarningData = {
      reportId: id,
    };

    try {
      const res = await issueWarning(issueWarningData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Warning issued successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning("Report is already dismissed");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something WntWrong");
    }
  };

  //report- temporary suspend
  const handleTemporarySuspend = async (id: string) => {
    const suspendData = {
      reportId: id,
      action: "suspension",
    };

    try {
      const res = await processReport(suspendData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Action taken successfully");
        setShowConfirm(false);
      }
      if (!res.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  //report-  PERMANENT BAND
  const handlePermanentBan = async (id: string) => {
    const bandData = {
      reportId: id,
      action: "banned",
    };
    try {
      const res = await processReport(bandData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Action taken successfully");
        setShowConfirm(false);
      }
      if (!res.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };
  //removed suspended
  const handleReportRemoveSuspend = async (id: string) => {
    const suspendedData = {
      id: id,
      action: "SUSPENDED",
    };
    console.log(id);
    try {
      const res = await removeSuspendAndBanned(suspendedData);
      if (res?.data?.success) {
        toast.success("Suspension removed successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  //removed banned
  const handleReportRemoveBanned = async (id: string) => {
    const banedData = {
      id: id,
      action: "BANNED",
    };
    console.log(id);
    try {
      const res = await removeSuspendAndBanned(banedData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Banned removed successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  // report handle Action
  const handleAction = (action: string | null, info: any | undefined) => {
    if (!action || !info) return;

    switch (action) {
      case "Mark as Safe":
        handleMakeSafe(info?.id);
        break;
      case "Issue Warning":
        handleIssueWarning(info?.id);
        break;
      case "Temporary Suspend":
        handleTemporarySuspend(info?.id);
        break;
      case "Permanent Ban":
        handlePermanentBan(info?.id);
        break;
      case "Remove Suspend":
        handleReportRemoveSuspend(info?.reportedId);
        break;
      case "Reinstate User":
        handleReportRemoveBanned(info?.reportedId);
        break;
    }
  };

  // voiceModeration- make safe
  const handleVoiceMakeSafe = async (id: string) => {
    const makeSafeData = {
      reportId: id,
      action: "DISMISSED",
    };

    try {
      const res = await voiceModerationAction(makeSafeData);

      if (res?.data?.success) {
        toast.success("Voice report processed successfully");
        setShowConfirm(false);
      }

      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      setShowConfirm(false);
    }
  };
  // voiceModeration- issue warning
  const handleVoiceIssueWarning = async (id: string) => {
    const issueWarningData = {
      reportId: id,
      action: "WARNED",
    };

    try {
      const res = await voiceModerationAction(issueWarningData);

      if (res?.data?.success) {
        toast.success("Voice report processed successfully");
        setShowConfirm(false);
      }

      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      setShowConfirm(false);
    }
  };

  // voiceModeration- temporary suspend warning
  const handleVoiceTemporarySuspend = async (id: string) => {
    const suspendData = {
      reportId: id,
      action: "SUSPENDED",
    };

    try {
      const res = await voiceModerationAction(suspendData);

      if (res?.data?.success) {
        toast.success("Voice suspended successfully");
        setShowConfirm(false);
      }

      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      setShowConfirm(false);
    }
  };
  // voiceModeration- temporary suspend warning
  const handleVoicePermanentBand = async (id: string) => {
    const bandedData = {
      reportId: id,
      action: "BANNED",
    };

    try {
      const res = await voiceModerationAction(bandedData);

      if (res?.data?.success) {
        toast.success("Voice permanent Banded successfully");
        setShowConfirm(false);
      }

      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      setShowConfirm(false);
    }
  };

  //removed suspended
  const handleModerationRemoveSuspend = async (id: string) => {
    const suspendedData = {
      id: id,
      action: "SUSPENDED",
    };
    console.log(id);
    try {
      const res = await removeSuspendAndBanned(suspendedData);
      if (res?.data?.success) {
        toast.success("Suspension removed successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  //removed banned
  const handleModerationRemoveBanned = async (id: string) => {
    const banedData = {
      id: id,
      action: "BANNED",
    };
    console.log(id);
    try {
      const res = await removeSuspendAndBanned(banedData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Banned removed successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning("something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  // voiceModeration Action
  const handleModerationAction = (
    action: string | null,
    info: any | undefined
  ) => {
    if (!action || !info) return;

    switch (action) {
      case "Mark as Safe":
        handleVoiceMakeSafe(info?.id);
        break;
      case "Issue Warning":
        handleVoiceIssueWarning(info?.id);
        break;
      case "Temporary Suspend":
        handleVoiceTemporarySuspend(info?.id);
        break;
      case "Permanent Ban":
        handleVoicePermanentBand(info?.id);
        break;
      case "Remove Suspend":
        handleModerationRemoveSuspend(info?.sender?.id);
        break;
      case "Reinstate User":
        handleModerationRemoveBanned(info?.sender?.id);
        break;
    }
  };

  ////////////////verifications

  const handleVerification = async () => {
    const id = localStorage.getItem("verificationId");
    const type = localStorage.getItem("verificationType");
    const verificationData = {
      verificationId: id,
      // type: "income",
      type: type,

      status: "VERIFIED",
    };

    console.log(verificationData);

    try {
      const res = await verification(verificationData);
      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "update Successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning(res?.data?.message || "something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };
  const handleRejection = async () => {
    const id = localStorage.getItem("verificationId");
    const type = localStorage.getItem("verificationType");
    const rejectionData = {
      verificationId: id,

      // type: "income",
      // type: "identity",
      type: type,

      status: "REJECTED",
      rejectionReason: rejectReason,
    };

    console.log(rejectionData);

    try {
      const res = await verification(rejectionData);
      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Rejected Successfully");
        setShowConfirm(false);
      }
      if (!res?.data?.success) {
        toast.warning(res?.data?.message || "something went wrong");
        setShowConfirm(false);
      }
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };

  //verification handle Action
  const handleVerificationAction = (
    action: string | null,
    reportDetails: string | undefined,
    rejectReason: string | undefined
  ) => {
    if (!action) return;

    switch (action) {
      case "Approve Verification":
        handleVerification();
        break;
      case "Reject Submission":
        handleRejection();
        break;
    }
  };

  const handleSubsCriptionDetails = (id: string) => {
    setSelectedUserId(id);
    setActiveSidebar("user"); // switch to user sidebar
  };

  const handlePlanDetails = (id: string) => {
    setSelectedPlanId(id);
    setActiveSidebar("plan"); // switch to plan sidebar
  };

  // Add this useEffect to listen for plan details updates
  useEffect(() => {
    // When plan details are loaded, switch to plan sidebar
    if (
      planDetails?.message === "Subscription plan details fetched successfully"
    ) {
      setActiveSidebar("plan");
    }
  }, [planDetails]);

  // Add this useEffect to listen for subscription details updates
  useEffect(() => {
    // When subscription details are loaded, switch to user sidebar
    if (
      subscriptionDetails?.message ===
      "Subscription user details retrieved successfully"
    ) {
      setActiveSidebar("user");
    }
  }, [subscriptionDetails]);

  // Add this useEffect to listen for newPlan changes
  useEffect(() => {
    const storedNewPlan = localStorage.getItem("newPlan");
    if (storedNewPlan === "add_new_plan") {
      setNewPlan(storedNewPlan);
      setActiveSidebar("add_plan");
    }
  }, []);
  // Add this useEffect to listen for newPlan changes
  useEffect(() => {
    const handleNewPlanUpdate = (event: CustomEvent) => {
      if (event.detail.action === "add_new_plan") {
        setNewPlan("add_new_plan");
        setActiveSidebar("add_plan");
      }
    };

    // Add event listener for the custom event
    window.addEventListener(
      "newPlanUpdated",
      handleNewPlanUpdate as EventListener
    );

    // Also check localStorage on initial load
    const storedNewPlan = localStorage.getItem("newPlan");
    if (storedNewPlan === "add_new_plan") {
      setNewPlan(storedNewPlan);
      setActiveSidebar("add_plan");
    }

    return () => {
      window.removeEventListener(
        "newPlanUpdated",
        handleNewPlanUpdate as EventListener
      );
    };
  }, []);

  // Update your handleCloseAddPlan function
  const handleCloseAddPlan = () => {
    setActiveSidebar("plan");
    setNewPlan(null);
    setIsEditing(false);
    localStorage.removeItem("newPlan");
  };
  const handleDeletePlan = async () => {
    const planId = localStorage.getItem("planId");
    console.log(planId);
    try {
      const res = await deletePlan(planId).unwrap();

      if (res.success) {
        toast.success("delete successfully");
        setShowConfirm(false);
      }
      if (!res.success) {
        toast.success("Something went wrong");
        setShowConfirm(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setShowConfirm(false);
    }
  };
  const formRef = useRef<HTMLFormElement>(null);
  // add plan
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data using FormData API
    const formData = new FormData(event.currentTarget);

    // Extract values from form data
    const planName = formData.get("planName") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("billingCycle") as string;
    const description = formData.get("features") as string;
    const convertPrice = Number(price);
    const convertedDuration = Number(duration);

    const planData = {
      planName,
      description,
      price: convertPrice,
      duration: convertedDuration,
    };

    if (isEditing) {
      // Handle edit - just console log for now

      console.log("Plan ID would be"); // You'll need to set this when editing
      const planId = localStorage.getItem("planId");
      console.log(planId);
      try {
        // Send the data as a single object (not nested under params)
        const res = await editPlan({
          id: planId,
          planName,
          description,
          price: convertPrice,
        }).unwrap();

        console.log(res);

        if (res.success) {
          toast.success("Plan updated successfully");
          if (formRef.current) {
            formRef.current.reset();
          }
          setIsEditing(false);
          setActiveSidebar("plan");
        }
      } catch (error) {
        toast.error("Failed to update plan");
        console.log(error);
      }
    } else {
      // Handle create new plan
      console.log("Creating new plan:", planData);
      try {
        const res = await createPlan(planData).unwrap();
        console.log(res);
        if (res.success) {
          toast.success("Plan created successfully");
          if (formRef.current) {
            formRef.current.reset();
          }
        }
      } catch (error) {
        toast.error("Failed to create plan");
        console.log(error);
      }
    }
  };

  // Add this function to handle edit button click
  const handleEditPlan = () => {
    setIsEditing(true);
    setActiveSidebar("add_plan");
  };

  return (
    <>
      {pathName === "/admin/user-management" && (
        <div className="flex justify-end">
          <div className="h-[850px] bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg">
            {/* Profile Image */}
            <Image
              src={
                userData?.image ||
                "https://i.ibb.co.com/jvvWfZ0w/1000-F-349497933-Ly4im8-BDm-HLa-Lzgy-Kg2f2y-ZOv-Jj-Btlw5.jpg"
              }
              alt={userData?.name || "User"}
              height={80}
              width={80}
              className="rounded-full object-cover"
            />

            {/* Name + Badges */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">{userData?.name}</h2>
              <div className="flex gap-2">
                {userData?.isIdentityImageVerified && (
                  <FaCircleCheck className="text-lg text-green-500" />
                )}
                {userData?.isProMember && (
                  <IoBagSharp className="text-lg text-yellow-400" />
                )}
              </div>
            </div>

            {/* Membership */}
            <p className="text-sm font-medium text-secondary border-b border-secondary pb-3">
              <span className="text-warning">{userData?.voxaPlanType}</span> –
              Ends{" "}
              {new Date(userData?.membershipEnds).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            {/* User Info */}
            <div className="pt-2 border-b pb-3 border-secondary">
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="text-secondary font-medium text-sm">
                  {userData?.location || "Unknown"}
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
                  Birthday: {userData?.birthday}
                </p>
              </div>
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineWatchLater className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Joined:{" "}
                  {new Date(userData?.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlinePhone className="text-xl" />
                <p className="text-secondary font-medium text-sm">
                  Phone: {userData?.phoneNumber || "+8823-xxxxxxx"}
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

            {/* Verification */}
            <div className="pt-3">
              <div className="flex justify-between">
                <div className="flex text-secondary gap-1 items-center">
                  <MdOutlineCheckCircleOutline className="text-xl" />
                  <p className="text-sm font-medium">
                    ID Verified:{" "}
                    {userData?.isIdentityImageVerified ? "Yes" : "No"}
                  </p>
                </div>
                <p className="text-sm font-bold cursor-pointer text-primary underline">
                  Download Doc
                </p>
              </div>
            </div>

            {/* Income Verification */}
            <div className="flex items-center border-b border-secondary pb-3 gap-1 text-secondary text-sm">
              <IoBagOutline className="text-xl" />
              <p>
                Income Verified: {userData?.isIncomeImageVisible ? "Yes" : "No"}
              </p>
            </div>

            {/* Profile Photos */}
            <div className="pt-3">
              <p className="text-secondary text-sm">
                Profile Photos: {userData?.profileImages?.length || 0}
              </p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {userData?.profileImages?.map((image: string, idx: number) => (
                  <Image
                    key={idx}
                    src={image}
                    height={54}
                    width={54}
                    alt={`profile-${idx}`}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="py-3 border-b border-secondary pb-3">
              <h3 className="text-secondary text-sm font-bold">Bio:</h3>
              <p className="font-medium text-secondary text-sm">
                {userData?.bio ||
                  "Trust me, I’m a billionaire, in Dogecoin XD! #aquarius"}
              </p>
            </div>

            {/* User Flag History */}
            <div className="pt-3">
              <h3 className="text-sm text-secondary font-bold">
                User Flag History
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-sm text-secondary">
                    <BiMessageError className="text-xl" />
                    <p>Voice Note Flagged: {userData?.blockedCount}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-secondary">
                    <GrStatusWarning className="text-xl" />
                    <p>Prior Warnings: {userData?.warningCount}</p>
                  </div>
                </div>

                {/* Circular Flag Rate */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="h-20 w-20 rounded-full flex items-center justify-center text-center text-white"
                    style={{
                      background: `conic-gradient(#E02200 ${
                        userData?.priorRejection * 10 || 7
                      }%, #333 0)`,
                    }}
                  >
                    <div className="h-16 w-16 bg-foreground rounded-full flex flex-col items-center justify-center">
                      <p className="text-[10px] text-secondary">Flag rate</p>
                      <p className="text-sm font-bold">
                        {userData?.priorRejection * 10 || 7}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link href="/admin/voice-moderation">
              <Button
                variant={"outline"}
                className="mt-3 !text-white font-bold"
              >
                View in Voice Moderation
              </Button>
            </Link>
          </div>
        </div>
      )}
      {pathName === "/admin/voice-moderation" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={
                moderationDetails?.sender?.image ||
                "https://i.ibb.co.com/jvvWfZ0w/1000-F-349497933-Ly4im8-BDm-HLa-Lzgy-Kg2f2y-ZOv-Jj-Btlw5.jpg"
              }
              alt="Profile"
              height={80}
              width={80}
              className="rounded-full"
            />

            {/* Name + Icons */}
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-xl font-bold text-white">
                {moderationDetails?.sender?.name || "VOXA User"}{" "}
              </h2>
              <div className="flex gap-2">
                <FaCircleCheck className="text-lg text-white" />
                <IoBagSharp className="text-lg text-white" />
              </div>
            </div>

            {/* Plan */}
            <p className="text-sm font-medium text-secondary border-b border-secondary pb-3 flex gap-1 items-center">
              <span className="text-warning">
                {moderationDetails?.sender?.voxaPlanType || "Free Plan"}
              </span>
              {" - "}

              <span>
                {moderationDetails?.status === "SUSPENDED" ? (
                  <span className="text-red-500 text-xs">
                    Suspended ({moderationDetails?.suspensionTimeLeft}h left)
                  </span>
                ) : moderationDetails?.status === "BANNED" ? (
                  <span className="text-red-500 text-xs">Permanent Banned</span>
                ) : moderationDetails?.sender?.subscriptionUser
                    ?.subscriptionEnd ? (
                  `End: ${new Date(
                    moderationDetails?.sender?.subscriptionUser?.subscriptionEnd
                  ).toLocaleDateString()}`
                ) : (
                  "N/A"
                )}
              </span>
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
              {!showConfirm ? (
                // 👉 Action Buttons (default view)
                <>
                  {moderationDetails?.status === "SUSPENDED" ? (
                    <Button
                      variant="outline"
                      className="!text-[#ffff] font-bold w-full"
                      onClick={() => {
                        setSelectedAction("Remove Suspend");
                        setShowConfirm(true);
                      }}
                    >
                      Remove Suspend
                    </Button>
                  ) : moderationDetails?.status === "BANNED" ? (
                    <Button
                      variant="outline"
                      className="!text-[#ffff] font-bold w-full"
                      onClick={() => {
                        setSelectedAction("Reinstate User");
                        setShowConfirm(true);
                      }}
                    >
                      Reinstate User
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="!text-[#00E04B] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Mark as Safe");
                          setShowConfirm(true);
                        }}
                      >
                        Mark as Safe
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E08A00] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Issue Warning");
                          setShowConfirm(true);
                        }}
                      >
                        Issue Warning
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Temporary Suspend");
                          setShowConfirm(true);
                        }}
                      >
                        Temporary Suspend
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Permanent Ban");
                          setShowConfirm(true);
                        }}
                      >
                        Permanent Ban
                      </Button>
                    </>
                  )}
                </>
              ) : (
                // 👉 Confirmation Box
                <div className="text-white bg-[#292928] py-3 rounded-xl">
                  <div className="space-y-2 text-center">
                    <h1 className="text-xl">{selectedAction}</h1>
                    <p className="text-xs">
                      You are about to {selectedAction?.toLowerCase()} this
                      user. This action cannot be undone.
                    </p>
                  </div>

                  <div className="bg-[#131312] w-52 mt-2 m-auto rounded-xl">
                    <Button
                      variant="outline"
                      className="font-bold w-full"
                      disabled={ModerationLoading}
                      onClick={() =>
                        handleModerationAction(
                          selectedAction,
                          moderationDetails
                        )
                      }
                    >
                      {ModerationLoading
                        ? `${selectedAction}.....`
                        : selectedAction}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="font-bold w-full"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {pathName === "/admin/verifications" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={
                verificationDetails?.image ||
                "https://i.ibb.co.com/jvvWfZ0w/1000-F-349497933-Ly4im8-BDm-HLa-Lzgy-Kg2f2y-ZOv-Jj-Btlw5.jpg"
              }
              alt=""
              height={80}
              width={80}
              className="rounded-full"
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
            <div className="mt-auto space-y-2 border-t border-secondary pt-3">
              {!showConfirm ? (
                <>
                  {/* Default Buttons */}
                  <Button
                    variant="outline"
                    className="!text-[#00E04B] font-bold w-full"
                    onClick={() => {
                      setSelectedAction("Approve Verification");
                      setShowConfirm(true);
                    }}
                  >
                    Approve Verification
                  </Button>

                  <Button
                    variant="outline"
                    className="!text-[#E02200] font-bold w-full"
                    onClick={() => {
                      setSelectedAction("Reject Submission");
                      setShowConfirm(true);
                    }}
                  >
                    Reject Submission
                  </Button>
                </>
              ) : (
                // Confirmation Box
                <div className="text-white bg-[#292928] py-3 rounded-xl">
                  <div className="space-y-2 text-center">
                    <h1 className="text-xl">{selectedAction}</h1>
                    <p className="text-xs">
                      You are about to {selectedAction?.toLowerCase()} this
                      request. This action cannot be undone.
                    </p>
                  </div>

                  {/* Show dropdown ONLY for Reject Submission */}
                  {selectedAction === "Reject Submission" && (
                    <div className="mt-3">
                      <label className="block text-xs mb-1 text-left px-4">
                        Select Reject Reason
                      </label>
                      <select
                        className="w-52 m-auto block rounded-lg bg-[#131312] text-white px-3 py-2 text-sm"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      >
                        <option value="">Choose a reason</option>
                        <option value="Document is unclear or blurry">
                          Document is unclear or blurry
                        </option>
                        <option value="Mismatched info">Mismatched info</option>
                        <option value="Suspicious or falsified document">
                          Suspicious or falsified document
                        </option>
                        <option value="Not sufficient for verification">
                          Not sufficient for verification
                        </option>
                      </select>
                    </div>
                  )}

                  <div className="bg-[#131312] w-52 mt-3 m-auto rounded-xl">
                    <Button
                      variant="outline"
                      className="font-bold w-full"
                      disabled={isLoading}
                      onClick={() =>
                        handleVerificationAction(
                          selectedAction,
                          reportDetails,
                          rejectReason
                        )
                      }
                    >
                      {isLoading ? `${selectedAction}.....` : selectedAction}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="font-bold w-full"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {pathName === "/admin/reports" && (
        <div className="flex justify-end">
          <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
            {/* Profile Image */}
            <Image
              src={
                reportDetails?.reported?.image ||
                "https://i.ibb.co.com/jvvWfZ0w/1000-F-349497933-Ly4im8-BDm-HLa-Lzgy-Kg2f2y-ZOv-Jj-Btlw5.jpg"
              }
              alt="Profile"
              height={80}
              width={80}
              className="rounded-full"
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

            {/* Plan + Subscription End */}
            <p className="text-sm font-medium text-secondary border-b border-secondary pb-3 flex gap-1 items-center">
              <span className="text-warning">
                {reportDetails?.sender?.voxaPlanType || "Free Plan"}
              </span>
              {" - "}
              <span>
                {reportDetails?.status === "ACTIONED" ? (
                  reportDetails?.actions?.some(
                    (action: any) => action.type === "PERMANENT_BAN"
                  ) ? (
                    <span className="text-red-500 text-xs">
                      Permanent Banned
                    </span>
                  ) : reportDetails?.actions?.some(
                      (action: any) => action.type === "TEMPORARY_SUSPENSION"
                    ) ? (
                    <span className="text-red-500 text-xs">
                      Suspended ({reportDetails?.suspensionEndTimeLeft || "N/A"}
                      h left)
                    </span>
                  ) : (
                    <span className="text-green-500 text-xs">
                      {
                        reportDetails?.reported?.subscriptionUser
                          ?.subscriptionEnd
                      }
                    </span>
                  )
                ) : reportDetails?.status === "DISMISSED" ? (
                  <span className=" text-xs">
                    End in{" "}
                    {format(
                      new Date(
                        reportDetails.reported.subscriptionUser.subscriptionEnd
                      ),
                      "dd MMM, yyyy"
                    )}
                  </span>
                ) : reportDetails?.reported?.subscriptionUser
                    ?.subscriptionEnd ? (
                  `End: ${new Date(
                    reportDetails?.reported?.subscriptionUser?.subscriptionEnd
                  ).toLocaleDateString()}`
                ) : (
                  "N/A"
                )}
              </span>
            </p>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pt-2 pb-3 border-secondary">
              {/* Location */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineLocationOn className="text-2xl" />
                <p className="font-medium text-sm">
                  {reportDetails?.reported?.location || "Unknown Location"}
                </p>
              </div>

              {/* Reported At */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <MdOutlineWatchLater className="text-xl" />
                <p className="font-medium text-sm">
                  Reported:{" "}
                  {reportDetails?.createdAt
                    ? new Date(reportDetails?.createdAt).toLocaleString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "N/A"}
                </p>
              </div>

              {/* Reporter */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <User className="text-xl" />
                <p className="font-medium text-sm ">
                  By:{" "}
                  <span className="text-red-500">
                    {reportDetails?.reporter?.name || "Anonymous"}
                  </span>
                </p>
              </div>

              {/* ID Verified */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="font-medium text-sm">
                  ID Verified:{" "}
                  {reportDetails?.reported?.isIdentityImageVerified
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              {/* Income Verified */}
              <div className="flex gap-2 my-1 items-center text-secondary">
                <IoCalendarClearOutline className="text-xl" />
                <p className="font-medium text-sm">
                  Income Verified:{" "}
                  {reportDetails?.reported?.isIncomeImageVerified
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              {/* Report Subject */}
              <div className="my-2">
                <p className="text-secondary font-medium text-sm">
                  Report Subject:{" "}
                  <span className="font-bold">
                    {reportDetails?.reason?.title || "N/A"}
                  </span>
                </p>
              </div>

              {/* Profile Photos */}
              <div className="my-2">
                <p className="text-secondary font-medium text-sm">
                  Profile Photos: (
                  {reportDetails?.reported?.profileImages?.length || 0}{" "}
                  uploaded)
                </p>
                <div className="flex gap-2 mt-2">
                  {reportDetails?.reported?.profileImages?.map(
                    (img: string, idx: number) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`Profile ${idx}`}
                        height={40}
                        width={40}
                        className="rounded-md"
                      />
                    )
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="my-2">
                <p className="text-secondary font-medium text-sm">Bio:</p>
                <p className="text-white text-xs mt-1">
                  {reportDetails?.reported?.bio || "No bio available."}
                </p>
              </div>
            </div>

            {/* Buttons at bottom */}
            <div className="mt-auto space-y-2">
              {!showConfirm ? (
                <>
                  {reportDetails?.status === "DISMISSED" ? (
                    // User is dismissed: show all action buttons
                    <>
                      <Button
                        variant="outline"
                        className="!text-[#00E04B] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Mark as Safe");
                          setShowConfirm(true);
                        }}
                      >
                        Mark as Safe
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E08A00] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Issue Warning");
                          setShowConfirm(true);
                        }}
                      >
                        Issue Warning
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Temporary Suspend");
                          setShowConfirm(true);
                        }}
                      >
                        Temporary Suspend
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Permanent Ban");
                          setShowConfirm(true);
                        }}
                      >
                        Permanent Ban
                      </Button>
                    </>
                  ) : reportDetails?.actions?.some(
                      (action: any) => action.type === "TEMPORARY_SUSPENSION"
                    ) ? (
                    // TEMPORARY SUSPENSION ACTIVE
                    <Button
                      variant="outline"
                      className="!text-[#ffff] font-bold w-full"
                      onClick={() => {
                        setSelectedAction("Remove Suspend");
                        setShowConfirm(true);
                      }}
                    >
                      Remove Suspend
                    </Button>
                  ) : reportDetails?.actions?.some(
                      (action: any) => action.type === "PERMANENT_BAN"
                    ) ? (
                    // PERMANENT BAN ACTIVE
                    <Button
                      variant="outline"
                      className="!text-[#ffff] font-bold w-full"
                      onClick={() => {
                        setSelectedAction("Reinstate User");
                        setShowConfirm(true);
                      }}
                    >
                      Reinstate User
                    </Button>
                  ) : (
                    // OTHERWISE SHOW ALL ACTION BUTTONS
                    <>
                      <Button
                        variant="outline"
                        className="!text-[#00E04B] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Mark as Safe");
                          setShowConfirm(true);
                        }}
                      >
                        Mark as Safe
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E08A00] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Issue Warning");
                          setShowConfirm(true);
                        }}
                      >
                        Issue Warning
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Temporary Suspend");
                          setShowConfirm(true);
                        }}
                      >
                        Temporary Suspend
                      </Button>

                      <Button
                        variant="outline"
                        className="!text-[#E02200] font-bold w-full"
                        onClick={() => {
                          setSelectedAction("Permanent Ban");
                          setShowConfirm(true);
                        }}
                      >
                        Permanent Ban
                      </Button>
                    </>
                  )}
                </>
              ) : (
                // Confirmation Box
                <div className="text-white bg-[#292928] py-3 rounded-xl">
                  <div className="space-y-2 text-center">
                    <h1 className="text-xl">{selectedAction}</h1>
                    <p className="text-xs">
                      You are about to {selectedAction?.toLowerCase()} this
                      user. This action cannot be undone.
                    </p>
                  </div>

                  <div className="bg-[#131312] w-52 mt-2 m-auto rounded-xl">
                    <Button
                      variant="outline"
                      className="font-bold w-full"
                      disabled={isLoading}
                      onClick={() =>
                        handleAction(selectedAction, reportDetails)
                      }
                    >
                      {isLoading ? `${selectedAction}.....` : selectedAction}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="font-bold w-full"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {pathName === "/admin/subscriptions" && (
        <>
          {activeSidebar === "add_plan" &&
            (newPlan === "add_new_plan" || isEditing) && (
              <div className="flex justify-end">
                <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <Image
                        src={"https://i.ibb.co.com/Lz07gzyq/Group-11.png"}
                        alt="Profile"
                        height={80}
                        width={80}
                        className="rounded-full"
                      />
                      <h2 className="text-lg font-bold text-white mt-2 mb-2">
                        {isEditing ? "Edit Plan" : "Add New Plan"}
                      </h2>
                      <p className="text-white text-xs">
                        {isEditing
                          ? "Update the details of this plan."
                          : "Define the details of this new plan. This will appear as an upgrade option for users once saved."}
                      </p>
                    </div>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-white"
                  >
                    <div>
                      <label className="text-sm">Plan Name</label>
                      <input
                        name="planName"
                        type="text"
                        className="w-full bg-muted border border-secondary rounded p-2 text-sm"
                        placeholder="Enter plan name"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm">Price ($)</label>
                      <input
                        name="price"
                        type="number"
                        className="w-full bg-muted border border-secondary rounded p-2 text-sm"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div className={`${isEditing ? "hidden" : ""}`}>
                      <label className="text-sm">Duration (days)</label>
                      <input
                        name="billingCycle"
                        type="number"
                        className="w-full bg-muted border border-secondary rounded p-2 text-sm"
                        placeholder="Enter duration in days"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm">Description</label>
                      <textarea
                        name="features"
                        className="w-full bg-muted border border-secondary rounded p-2 text-sm"
                        placeholder="Enter plan description"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        variant={"outline"}
                        className="mt-auto !text-[#ffff] font-bold flex-1 bg-[#000000]"
                        disabled={CreatePlanLoading}
                      >
                        {CreatePlanLoading
                          ? isEditing
                            ? "Saving..."
                            : "Creating..."
                          : isEditing
                          ? "Save Changes"
                          : "Create Plan"}
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleCloseAddPlan}
                        className="!text-[#ffff] font-bold flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          {/* Plan Sidebar */}
          {activeSidebar === "plan" &&
            planDetails?.message ===
              "Subscription plan details fetched successfully" && (
              <div className="flex justify-end">
                <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
                  {/* Icon */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src={"https://i.ibb.co.com/Lz07gzyq/Group-11.png"}
                        alt="User Avatar"
                        height={80}
                        width={80}
                        className="rounded-full object-cover mr-3"
                      />
                    </div>
                  </div>

                  {/* Plan Title & Price */}
                  <h2 className="text-lg font-bold text-white">
                    Monthly - $9.99
                  </h2>
                  <p className="text-sm text-gray-300 mb-3">
                    Bill After 30 days
                  </p>

                  {/* Divider */}
                  <hr className="border-gray-600 my-2" />

                  {/* Stats */}
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-400 w-4 h-4" />
                      <span>Active Subscriptions: 1,382</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-400 w-4 h-4" />
                      <span>Monthly Revenue: $3,284</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-400 w-4 h-4" />
                      <span>Failed Renewals: 12</span>
                    </div>
                  </div>

                  {/* Buttons at bottom */}
                  <div className="mt-auto ml-6 space-y-2 pt-4">
                    {!showConfirm ? (
                      <>
                        <Button
                          variant={"outline"}
                          className="!text-[#ffff] font-bold w-48"
                          onClick={handleEditPlan}
                        >
                          Edit Plan
                        </Button>
                        <Button
                          variant={"outline"}
                          className="!text-[#ffff] font-bold w-48"
                          onClick={() => setShowConfirm(true)}
                        >
                          Delete Plan
                        </Button>
                      </>
                    ) : (
                      // Confirmation Box
                      <div className="text-white bg-[#292928] py-3 rounded-xl">
                        <div className="space-y-2 text-center">
                          <h1 className="text-xl">Delete Plan</h1>
                          <p className="text-xs">
                            You are about to delete this plan. This action
                            cannot be undone.
                          </p>
                        </div>

                        <div className="bg-[#131312] w-52 mt-2 m-auto rounded-xl">
                          <Button
                            variant="outline"
                            className="font-bold w-full"
                            disabled={isLoading}
                            onClick={handleDeletePlan}
                          >
                            {isLoading ? "Deleting..." : "Confirm Delete"}
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          className="font-bold w-full mt-2"
                          onClick={() => setShowConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* User Sidebar */}
          {activeSidebar === "user" &&
            subscriptionDetails?.message ===
              "Subscription user details retrieved successfully" && (
              <div className="flex justify-end">
                <div className="h-screen bg-foreground absolute mx-5 w-64 p-3 z-10 mt-20 rounded-lg flex flex-col">
                  {/* Profile Image and header with toggle button */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src={
                          subscriptionDetails?.data?.data?.image ||
                          "https://i.ibb.co.com/jvvWfZ0w/1000-F-349497933-Ly4im8-BDm-HLa-Lzgy-Kg2f2y-ZOv-Jj-Btlw5.jpg"
                        }
                        alt="User Avatar"
                        height={40}
                        width={40}
                        className="rounded-full object-cover mr-3"
                      />
                      <h2 className="text-lg font-bold text-white">
                        User Details
                      </h2>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSidebar("plan")}
                      className="text-xs h-8"
                    >
                      View Plan
                    </Button>
                  </div>

                  {/* Name + Icons */}
                  <div className="flex justify-between items-center mt-1">
                    <h2 className="text-xl font-bold text-white">
                      {subscriptionDetails?.data?.name || "Unknown User"}
                    </h2>
                    <div className="flex gap-2">
                      <FaCircleCheck className="text-lg text-green-400" />
                      <IoBagSharp className="text-lg text-white" />
                    </div>
                  </div>

                  {/* Plan */}
                  <p className="text-sm font-medium text-warning border-b border-secondary pb-2 mt-2">
                    {subscriptionDetails?.data?.voxaPlanType?.replace("_", " ")}{" "}
                    – End in{" "}
                    {subscriptionDetails?.data?.subscriptionUser
                      ?.subscriptionEnd
                      ? new Date(
                          subscriptionDetails?.data?.subscriptionUser?.subscriptionEnd
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto pt-2 pb-3 border-secondary text-secondary space-y-3 text-sm mt-2">
                    {/* Location */}
                    <div className="flex gap-2 items-center">
                      <MdOutlineLocationOn className="text-lg" />
                      <p>
                        {subscriptionDetails?.data?.location ||
                          "Unknown Location"}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="flex gap-2 items-center">
                      <MdEmail className="text-lg" />
                      <p>{subscriptionDetails?.data?.email || "N/A"}</p>
                    </div>

                    {/* Identity Verification */}
                    <div className="flex gap-2 items-center">
                      <FaIdCard className="text-lg" />
                      <p>
                        Identity Verified:{" "}
                        {subscriptionDetails?.data?.isIdentityImageVerified
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>

                    {/* Income Verification */}
                    <div className="flex gap-2 items-center">
                      <FaMoneyCheckAlt className="text-lg" />
                      <p>
                        Income Verified:{" "}
                        {subscriptionDetails?.data?.isIncomeImageVerified
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>

                    {/* Subscription Plan */}
                    <div className="flex gap-2 items-center">
                      <IoBagSharp className="text-lg" />
                      <p>
                        Subscription Plan:{" "}
                        {subscriptionDetails?.data?.subscriptionUser
                          ?.subscriptionPlanType || "N/A"}
                      </p>
                    </div>

                    {/* Subscription Status */}
                    <div className="flex gap-2 items-center">
                      <MdOutlineVerifiedUser className="text-lg" />
                      <p>
                        Subscription Status:{" "}
                        {subscriptionDetails?.data?.subscriptionUser
                          ?.subscriptionStatus || "N/A"}
                      </p>
                    </div>

                    {/* Subscription Start */}
                    <div className="flex gap-2 items-center">
                      <IoCalendarClearOutline className="text-lg" />
                      <p>
                        Start Date:{" "}
                        {subscriptionDetails?.data?.subscriptionUser
                          ?.subscriptionStart
                          ? new Date(
                              subscriptionDetails?.data?.subscriptionUser?.subscriptionStart
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>

                    {/* Subscription End */}
                    <div className="flex gap-2 items-center">
                      <IoCalendarNumberOutline className="text-lg" />
                      <p>
                        End Date:{" "}
                        {subscriptionDetails?.data?.subscriptionUser
                          ?.subscriptionEnd
                          ? new Date(
                              subscriptionDetails?.data?.subscriptionUser?.subscriptionEnd
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Buttons at bottom */}
                  <div className="space-y-2 mt-2">
                    <Button
                      variant={"outline"}
                      className="!text-[#00E04B] font-bold w-full"
                    >
                      View Payment History
                    </Button>
                    <Button
                      variant={"outline"}
                      className="!text-[#E02200] font-bold w-full"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
}
