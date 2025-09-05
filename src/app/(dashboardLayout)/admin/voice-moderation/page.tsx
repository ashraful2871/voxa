"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdOutlineCalendarMonth } from "react-icons/md"

interface User {
  id: number
  caseId: string
  userName: string
  location: string
  flaggedTime: string
  flagType: string
}

const queue: User[] = [
  { id: 1, caseId: "#4532", userName: "Mark Thompson", location: "Chicago, IL", flaggedTime: "Jul 8, 3:21 PM", flagType: "AI" },
  {
    id: 2,
    caseId: "#4532",
    userName: "Luther Logan",
    location: "Chicago, IL",
    flaggedTime: "Jul 8, 3:21 PM",
    flagType: "User Report",
  },
  {
    id: 3,
    caseId: "#4532",
    userName: "Yu Nakamura",
    location: "Chicago, IL",
    flaggedTime: "Jul 7, 5:13 PM",
    flagType: "User Report",
  },
  {
    id: 4,
    caseId: "#4532",
    userName: "Mike Barlow",
    location: "Tokyo, Japan",
    flaggedTime: "Jul 8, 3:21 PM",
    flagType: "User Report",
  },
  {
    id: 5,
    caseId: "#4532",
    userName: "Luther Logan",
    location: "Berlin, Germany",
    flaggedTime: "Jul 8, 3:21 PM",
    flagType: "AI",
  },
  {
    id: 6,
    caseId: "#4532",
    userName: "Mike Barlow",
    location: "Berlin, Germany",
    flaggedTime: "Jul 6, 11:40 AM",
    flagType: "User Report",
  },
  { id: 7, caseId: "#4532", userName: "Mark Thompson", location: "Tokyo, Japan", flaggedTime: "Jul 6, 11:40 AM", flagType: "AI" },
  {
    id: 8,
    caseId: "#4532",
    userName: "Yu Nakamura",
    location: "Atlanta, GA",
    flaggedTime: "Jul 6, 11:40 AM",
    flagType: "AI",
  },
  {
    id: 9,
    caseId: "#4532",
    userName: "Luther Logan",
    location: "Atlanta, GA",
    flaggedTime: "Jul 5, 8:16 PM",
    flagType: "User Report",
  },
  {
    id: 10,
    caseId: "#4532",
    userName: "Emma Zhang",
    location: "London, UK",
    flaggedTime: "Jul 8, 3:21 PM",
    flagType: "AI",
  },
  {
    id: 11,
    caseId: "#4532",
    userName: "John Reynolds",
    location: "London, UK",
    flaggedTime: "Jul 6, 11:40 AM",
    flagType: "User Report",
  },
  {
    id: 12,
    caseId: "#4532",
    userName: "John Reynolds",
    location: "Toronto, ON",
    flaggedTime: "Jul 8, 3:21 PM",
    flagType: "User Report",
  },
  {
    id: 13,
    caseId: "#4532",
    userName: "Emma Zhang",
    location: "Chicago, IL",
    flaggedTime: "Jul 6, 11:40 AM",
    flagType: "AI",
  },
  {
    id: 14,
    caseId: "#4532",
    userName: "Martinez",
    location: "Toronto, ON",
    flaggedTime: "Jul 5, 8:16 PM",
    flagType: "User Report",
  },
]

export default function VoiceModeration() {
  const [filter, setFilter] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = queue.filter((user) => {
    if (filter === "All") return true
    return user.flagType === filter
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="mx-72">

      <div className="w-full max-w-7xl text-secondary bg-foreground p-5 rounded-lg mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Voice Moderation Queue</h1>

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
                      {date ? date.toLocaleDateString() : <MdOutlineCalendarMonth />}

                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>


            <Tabs defaultValue="tab-1" className="items-center">
              <TabsList className="p-1">
                <TabsTrigger value="tab-1">All</TabsTrigger>
                <TabsTrigger value="tab-2">Warned</TabsTrigger>
                <TabsTrigger value="tab-3">Suspended</TabsTrigger>
                <TabsTrigger value="tab-4">Banned</TabsTrigger>
              </TabsList>
              {/* <TabsContent value="tab-1">

              </TabsContent> */}
            </Tabs>

          </div>
        </div>

        {/* Table */}
        <div className=" bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-white font-bold text-sm">Case ID</TableHead>
                  <TableHead className="text-white font-bold text-sm">User Name</TableHead>
                  <TableHead className="text-white font-bold text-sm">Location</TableHead>
                  <TableHead className="text-white font-bold text-sm">Flagged Time</TableHead>
                  <TableHead className="text-white font-bold text-sm">Flag Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-bold text-sm text-white">{user.caseId}</TableCell>
                    <TableCell className="text-muted-foreground">{user.userName}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    {/* <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${user.location === "VOXA Gold"
                          ? " text-warning"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {user.location}
                      </span>
                    </TableCell> */}
                    <TableCell className="text-muted-foreground">{user.flaggedTime}</TableCell>
                    <TableCell className="text-secondary">{user.flagType}</TableCell>
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
              className={`min-w-[32px] ${currentPage === page
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
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
