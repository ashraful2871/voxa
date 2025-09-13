/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
import { useVerificationQueueQuery } from "@/redux/features/userManagement/userManagementApi";
import PageLoading from "@/components/shared/PageLoading";
import { useVerificationDetailsQuery } from "@/redux/features/userManagement/verification-details";
import { skipToken } from "@reduxjs/toolkit/query";
import { receivedVerificationDetails } from "@/utils/receivedVerificationDetails";

export default function Verifications() {
  const { data, isLoading } = useVerificationQueueQuery(undefined);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [selectedTab, setSelectedTab] = useState<string>("tab-1");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { data: verificationDetails } = useVerificationDetailsQuery(
    selectId ? { id: selectId } : skipToken
  );

  useEffect(() => {
    if (verificationDetails) {
      receivedVerificationDetails(verificationDetails);
    }
  }, [verificationDetails]);
  const itemsPerPage = 10;
  const verifications = data?.data?.verifications || [];

  // Filtering by type (Select) and status (Tabs)
  const filteredVerifications = verifications.filter((item: any) => {
    // Type filter
    if (filter === "VOXA Free" && item.type !== "INCOME") return false;
    if (filter === "VOXA Gold" && item.type !== "IDENTITY") return false;

    // Tab / status filter
    if (selectedTab === "tab-2" && item.status !== "PENDING") return false;
    if (selectedTab === "tab-3" && item.status !== "VERIFIED") return false;
    if (selectedTab === "tab-4" && item.status !== "REJECTED") return false;

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVerifications = filteredVerifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  console.log(paginatedVerifications);

  // Handle page change
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Reset page if filters or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, selectedTab]);

  const handleVerificationDetails = (user: any) => {
    setSelectId(user?.userId);
    console.log(user);
    localStorage.setItem("verificationId", user?.id);
    localStorage.setItem("verificationType", user?.type);
    localStorage.setItem("Verification Queue", JSON.stringify(user));

    console.log(user);
  };

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }
  return (
    <div className="mx-72">
      <div className="w-full max-w-7xl text-secondary bg-foreground p-5 rounded-lg mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Verification Queue
          </h1>

          {/* Filter */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[160px] bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="VOXA Free">Income Verification</SelectItem>
                  <SelectItem value="VOXA Gold">ID Verification</SelectItem>
                </SelectContent>
              </Select>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
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
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Tabs for status */}
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="items-center"
            >
              <TabsList className="p-1">
                <TabsTrigger value="tab-1">All</TabsTrigger>
                <TabsTrigger value="tab-2">Pending</TabsTrigger>
                <TabsTrigger value="tab-3">Verified</TabsTrigger>
                <TabsTrigger value="tab-4">Rejected</TabsTrigger>
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
                    User Name
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Type
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-white text-end font-bold text-sm">
                    Submitted
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVerifications.map((user: any) => (
                  <TableRow
                    onClick={() => handleVerificationDetails(user)}
                    key={user.id}
                    className="border-border hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell className="text-white text-sm font-bold">
                      {user.userName}
                    </TableCell>
                    <TableCell>
                      {user.type === "IDENTITY"
                        ? "ID Verification"
                        : "Income Verification"}
                    </TableCell>
                    <TableCell
                      className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${
                        user.status === "PENDING"
                          ? "text-warning"
                          : user.status === "VERIFIED"
                          ? "text-success"
                          : "text-red-500"
                      }`}
                    >
                      {user.status === "VERIFIED"
                        ? "Approved"
                        : user.status === "PENDING"
                        ? "Pending"
                        : "Rejected"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-end">
                      {new Date(user.submittedAt).toLocaleString()}
                    </TableCell>
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
  );
}
