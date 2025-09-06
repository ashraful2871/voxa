/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
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
import { useModerationQueueQuery } from "@/redux/features/userManagement/userManagementApi";

export default function VoiceModeration() {
  const [selectedTab, setSelectedTab] = useState("tab-1");

  const { data } = useModerationQueueQuery(undefined);
  console.log(data?.data?.voiceModerations);
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers =
    data?.data?.voiceModerations
      ?.filter((user: any) => {
        if (filter === "All") return true;
        if (filter === "VOXA Free") return user.flagType === "AI";
        if (filter === "VOXA Gold") return user.flagType === "USER";
        return true;
      })
      .filter((user: any) => {
        if (selectedTab === "tab-1") return true;
        if (selectedTab === "tab-2") return user.status === "PENDING";
        if (selectedTab === "tab-3") return user.status === "SUSPENDED";
        if (selectedTab === "tab-4") return user.status === "BANNED";
        return true;
      }) || [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="mx-72">
      <div className="w-full max-w-7xl text-secondary bg-foreground p-5 rounded-lg mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Voice Moderation Queue
          </h1>

          {/* Filter */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[140px] bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="VOXA Free">Flagged by AI</SelectItem>
                  <SelectItem value="VOXA Gold">Flagged by User</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className=" justify-between font-normal"
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
            </div>

            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="items-center"
            >
              <TabsList className="p-1">
                <TabsTrigger value="tab-1">All</TabsTrigger>
                <TabsTrigger value="tab-2">Warned</TabsTrigger>
                <TabsTrigger value="tab-3">Suspended</TabsTrigger>
                <TabsTrigger value="tab-4">Banned</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Table */}
        <div className=" bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-white font-bold text-sm">
                    Case ID
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    User Name
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Location
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Flagged Time
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Flag Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell className="font-bold text-sm text-white">
                      {user.messageId}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.sender.name}
                    </TableCell>
                    <TableCell>{user.sender.email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-secondary">
                      {user.flagType}
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
