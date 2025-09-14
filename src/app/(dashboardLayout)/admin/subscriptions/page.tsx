/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useSubscriptionManagementQuery } from "@/redux/features/userManagement/userManagementApi";
import PageLoading from "@/components/shared/PageLoading";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSubscriptionDetailsQuery } from "@/redux/features/userManagement/subscriptionDetailsApi";
import { receivedSubscriptionDetails } from "@/utils/receivedSubscriptionDetails";
import {
  useAllSubscriptionPlansQuery,
  useSubscriptionPlanDetailsQuery,
} from "@/redux/features/userManagement/subscriptionPlansapi";
import { receivedPlanDetails } from "@/utils/receivedPlanDetails";

export default function Subscriptions() {
  const [selectId, setSelectId] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const { data, isLoading, isError } =
    useSubscriptionManagementQuery(undefined);
  const { data: subscriptions } = useAllSubscriptionPlansQuery(undefined);
  console.log(subscriptions);
  const { data: subscriptionDetails } = useSubscriptionDetailsQuery(
    selectId ? { id: selectId } : skipToken
  );

  const { data: planDetails } = useSubscriptionPlanDetailsQuery(
    planId ? { id: planId } : skipToken
  );
  console.log(planDetails);

  useEffect(() => {
    if (subscriptionDetails) {
      receivedSubscriptionDetails(subscriptionDetails);
    }
  }, [subscriptionDetails]);

  useEffect(() => {
    if (planDetails) {
      receivedPlanDetails(planDetails);
    }
  }, [planDetails]);

  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  if (isError) {
    return (
      <div className="text-center text-red-500 p-10">
        Failed to load subscriptions.
      </div>
    );
  }

  // Transform API data into table-friendly structure
  const users =
    data?.data?.users.map((user: any) => ({
      id: user.id,
      name: user.name || user.email,
      plan: user.subscriptionUser?.subscriptionPlanType || "---",
      status: user.subscriptionUser?.subscriptionStatus
        ? user.subscriptionUser.subscriptionStatus === "active"
          ? "Active"
          : "Cancelled"
        : "---",
      startDate: user.subscriptionUser
        ? new Date(user.subscriptionUser.subscriptionStart).toLocaleDateString()
        : "---",
      renewal: user.subscriptionUser
        ? new Date(user.subscriptionUser.subscriptionEnd).toLocaleDateString()
        : "---",
    })) || [];

  // Filter
  const filteredUsers = users.filter((user: any) => {
    if (filter === "All") return true;
    return user.status === filter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSubsCriptionDetails = (id: string) => {
    setSelectId(id);
    console.log(id);
  };

  const handlePlanDetails = async (id: string, planId: string) => {
    console.log(planId);
    localStorage.setItem("planId", planId);
    setPlanId(id);
  };

  // In your Subscriptions component
  const handleAddNewPlan = () => {
    localStorage.setItem("newPlan", "add_new_plan");
    // Dispatch a custom event to notify the sidebar
    window.dispatchEvent(
      new CustomEvent("newPlanUpdated", {
        detail: { action: "add_new_plan" },
      })
    );
  };

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  return (
    <div className="mx-72">
      <div className="w-full max-w-7xl mx-auto">
        {/* Plans Section */}
        <div className="grid xl:grid-cols-12 lg:grid-cols-6 gap-9 mb-10">
          {subscriptions?.data.map((subscription: any, idx: number) => (
            <>
              <div
                onClick={() =>
                  handlePlanDetails(
                    subscription?.stripePriceId,
                    subscription?.id
                  )
                }
                key={idx}
                className="col-span-3 border py-5 px-5 border-secondary rounded-lg bg-foreground cursor-pointer"
              >
                <h2 className="text-white font-bold">{subscription?.type}</h2>
                <p className="text-3xl text-white font-light">
                  ${subscription?.price}
                </p>
              </div>
            </>
          ))}

          <div
            onClick={() => handleAddNewPlan()}
            className="col-span-3 py-5 px-5 border border-secondary rounded-lg bg-foreground flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <FiPlus className="text-warning text-2xl" />
            <p className="font-bold text-white">Add New Plan</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="text-secondary bg-foreground p-5 rounded-lg space-y-6">
          {/* Header & Filter */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Verification Queue
            </h1>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Filter by:
                </span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[140px] bg-muted border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between font-normal"
                    >
                      {date ? (
                        date.toLocaleDateString()
                      ) : (
                        <MdOutlineCalendarMonth />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(d) => {
                        setDate(d);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Tabs
                value={filter} // Sync tab with filter state
                onValueChange={(val) => setFilter(val)} // Update filter on tab click
                className="items-center"
              >
                <TabsList className="p-1">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Active">Active</TabsTrigger>
                  <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-muted/50">
                    <TableHead className="text-white font-bold text-sm">
                      User
                    </TableHead>
                    <TableHead className="text-white font-bold text-sm">
                      Plan
                    </TableHead>
                    <TableHead className="text-white font-bold text-sm">
                      Status
                    </TableHead>
                    <TableHead className="text-white font-bold text-sm">
                      Start Date
                    </TableHead>
                    <TableHead className="text-white text-end font-bold text-sm">
                      Renewal
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user: any) => (
                    <TableRow
                      onClick={() => handleSubsCriptionDetails(user?.id)}
                      key={user.id}
                      className="border-border hover:bg-muted/50 cursor-pointer"
                    >
                      <TableCell className="text-white text-sm font-bold">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.plan}
                      </TableCell>
                      <TableCell
                        className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${
                          user.status === "Active"
                            ? "text-success"
                            : user.status === "Cancelled"
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {user.status}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.startDate}
                      </TableCell>
                      <TableCell className="text-end">{user.renewal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-muted-foreground hover:text-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`min-w-[32px] ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-secondary"
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
