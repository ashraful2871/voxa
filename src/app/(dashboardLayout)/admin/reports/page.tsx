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
import { useReportsQuery } from "@/redux/features/userManagement/userManagementApi";
import PageLoading from "@/components/shared/PageLoading";

interface Report {
  id: string;
  createdAt: string;
  status: "PENDING" | "ACTIONED" | "DISMISSED";
  reported: {
    name: string;
    email: string;
  };
  reason: {
    title: string;
  };
}

export default function Reports() {
  const { data, isLoading } = useReportsQuery(undefined);
  const reports: Report[] = data?.data?.reports || [];

  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Filter based on status tab
  const filteredReports = reports.filter((report) => {
    if (filter === "All") return true;
    return report.status === filter.toUpperCase();
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1); // reset to first page when tab changes
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
            Reports
          </h1>

          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col gap-3">
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

            {/* Tabs */}
            <Tabs
              value={filter}
              onValueChange={handleTabChange}
              className="items-center"
            >
              <TabsList className="p-1">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="PENDING">Pending</TabsTrigger>
                <TabsTrigger value="ACTIONED">Actioned</TabsTrigger>
                <TabsTrigger value="DISMISSED">Dismissed</TabsTrigger>
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
                    Date
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Reported User
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Type
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell className="text-sm">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-white text-sm font-bold">
                      {report.reported.name || report.reported.email}
                    </TableCell>
                    <TableCell>{report.reason.title}</TableCell>
                    <TableCell
                      className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${
                        report.status === "PENDING"
                          ? "text-warning"
                          : report.status === "ACTIONED"
                          ? "text-success"
                          : "text-red-500"
                      }`}
                    >
                      {report.status.charAt(0) +
                        report.status.slice(1).toLowerCase()}
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
