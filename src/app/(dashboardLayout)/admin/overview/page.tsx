"use client";

import { LiaUserCheckSolid } from "react-icons/lia";
import { LuUserRound } from "react-icons/lu";
import { RiVoiceprintFill } from "react-icons/ri";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";
import RevenueChart from "@/components/shared/RevenueChart";
import ReportedUsersChart from "@/components/shared/RepotedUserChart";
import { TbHandClick } from "react-icons/tb";
import {
  useAiFlagedQuery,
  useCurrentPlanQuery,
  useGoldUserQuery,
  useSubscriptionUsagesQuery,
  useTotalNoteSendQuery,
  useTotalUserQuery,
  useUserReportQuery,
} from "@/redux/features/userManagement/userManagementApi";

export default function Overview() {
  const { data: users } = useTotalUserQuery(undefined);
  const { data: goldUsers } = useGoldUserQuery(undefined);
  const { data: note } = useTotalNoteSendQuery(undefined);
  const { data: flaged } = useAiFlagedQuery(undefined);
  const { data: report } = useUserReportQuery(undefined);
  const { data: subscription } = useSubscriptionUsagesQuery(undefined);
  const { data: plans } = useCurrentPlanQuery(undefined);

  return (
    <div className="flex justify-end">
      <div className="bg-[#292928] p-6 rounded-lg w-full ml-72">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Platform Overview
        </h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 mt-5 gap-7">
          <div className="rounded-lg p-5 bg-foreground">
            <LiaUserCheckSolid className="text-primary text-5xl" />
            <h3 className="text-white font-bold">Total Registered Users</h3>
            <p className="text-[32px] font-light text-white">
              {users?.data?.totalUsers}
            </p>
          </div>
          <div className="rounded-lg p-5 bg-foreground">
            <LuUserRound className="text-primary text-5xl" />
            <h3 className="text-white font-bold">Active Users</h3>
            <p className="text-[32px] font-light text-white">
              {users?.data?.totalUsers}
            </p>
          </div>
          <div className="rounded-lg p-5 bg-foreground">
            <RiVoiceprintFill className="text-warning text-5xl" />
            <h3 className="text-white font-bold">Voxa Gold Subscribers</h3>
            <p className="text-[32px] font-light text-white">
              {goldUsers?.data?.goldUsers}
            </p>
          </div>
          <div className="rounded-lg p-5 bg-foreground">
            <CiMicrophoneOn className="text-primary text-5xl" />
            <h3 className="text-white font-bold">Voice Notes Sent Today</h3>
            <p className="text-[32px] font-light text-white">
              {note?.data?.voiceMessages}
            </p>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-7 my-10">
          <div className="bg-foreground grid grid-cols-2 rounded-lg p-5">
            <div className="border-r border-stone-600 flex gap-3">
              <CiMicrophoneOff className="text-5xl text-primary" />
              <div>
                <h2 className="font-bold text-white">AI-Flagged Messages</h2>
                <p className="text-[32px] font-light text-white">
                  {flaged?.data?.aiFlagged}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href={"/admin/voice-moderation"}>
                <Button
                  variant={"outline"}
                  className="text-white !bg-background border-foreground py-5"
                >
                  View in Voice Moderation
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-foreground grid grid-cols-2 rounded-lg p-5">
            <div className="border-r border-stone-600 flex gap-3">
              <IoWarningOutline className="text-5xl text-primary" />
              <div>
                <h2 className="font-bold text-white">
                  User Reports Filed (24h)
                </h2>
                <p className="text-[32px] font-light text-white">
                  {report?.data?.totalReports}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href={"/admin/reports"}>
                <Button
                  variant={"outline"}
                  className="text-white !bg-background border-foreground py-5"
                >
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-8 lg:col-span-12">
            <RevenueChart />
            <div className="p-6 mt-7 grid grid-cols-3 justify-between w-full bg-foreground rounded-lg">
              <div className="flex gap-3 border-r border-stone-600">
                <TbHandClick className="text-5xl text-primary" />
                <div>
                  <h3 className="text-white font-bold">Current Plan</h3>
                  <p className="text-white font-light text-[32px]">
                    {plans?.data?.allPlans?.length}
                  </p>
                </div>
              </div>
              <div className="pl-5 border-r border-stone-600">
                <p className="font-bold text-white">Monthly — $9.99</p>
                <p className="font-bold text-white">Quarterly — $24.99</p>
                <p className="font-bold text-white">Annual — $89.99</p>
              </div>
              <div className="flex justify-center items-center">
                <Link href={"/admin/subscriptions"}>
                  <Button
                    variant={"outline"}
                    className="text-white text-sm xl:px-3 lg:px-2.5 xl:ml-0 lg:ml-5 !bg-background border-foreground py-5"
                  >
                    Subscriptions Management
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4 lg:col-span-12">
            <div className="bg-foreground p-6 mb-7 rounded-lg">
              <div className="flex justify-between w-full">
                <p className="font-bold text-sm text-white">
                  Monthly Subscriber
                </p>
                <p className="text-sm text-white">
                  {subscription?.data?.monthlySubscribers?.totalUser}
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold text-sm text-white">
                  Quarterly Subscriber
                </p>
                <p className="text-sm text-white">
                  {subscription?.data?.quarterlySubscribers?.totalUser}
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold text-sm text-white">
                  Annual Subscriber
                </p>
                <p className="text-sm text-white">
                  {subscription?.data?.annualSubscribers?.totalUser}
                </p>
              </div>
            </div>
            <ReportedUsersChart />
          </div>
        </div>
      </div>
    </div>
  );
}
