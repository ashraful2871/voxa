"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
    userName: string
    date: string
    type: string
    status: 'Pending' | 'Actioned' | 'Dismissed'
}

const queue: User[] = [
    { id: 1, userName: "Mark Thompson", status: 'Pending', date: "Jul 2, 2:12PM", type: "Fake profile or impersonation" },
    {
        id: 2,
        userName: "Luther Logan",
        date: "Jul 2, 2:12PM",
        type: "Inappropriate Profile Photo",
        status: "Actioned"

    },
    {
        id: 3,
        userName: "Yu Nakamura",
        date: "Jul 2, 2:12PM",
        type: "Inappropriate Profile Photo",
        status: "Dismissed"
    },
    {
        id: 4,
        userName: "Mike Barlow",
        status: "Dismissed",
        date: "Jul 2, 2:12PM",
        type: "Inappropriate Profile Photo",
    },
    {
        id: 5,
        userName: "Luther Logan",
        date: "Jul 2, 2:12PM",
        type: "Fake profile or impersonation",
        status: 'Pending',
    },
    {
        id: 6,
        userName: "Mike Barlow",
        date: "Jul 2, 2:12PM",
        type: "Inappropriate Profile Photo",
        status: "Actioned"
    },
    { id: 7, userName: "Mark Thompson", status: "Actioned", date: "Jul 2, 2:12PM", type: "Fake profile or impersonation" },
    {
        id: 8,
        userName: "Yu Nakamura",
        date: "Jul 2, 2:12PM",
        type: "Fake profile or impersonation",
        status: "Actioned"
    },
    {
        id: 9,
        userName: "Luther Logan",
        date: "Jul 5, 8:16 PM",
        type: "Offensive Bio / Text",
        status: 'Pending',
    },
    {
        id: 10,
        userName: "Emma Zhang",
        date: "Jul 2, 2:12PM",
        type: "Fake profile or impersonation",
        status: "Actioned",
    },
    {
        id: 11,
        userName: "John Reynolds",
        date: "Jul 2, 2:12PM",
        type: "Offensive Bio / Text",
        status: "Dismissed"
    },
    {
        id: 12,
        userName: "John Reynolds",
        date: "Jul 2, 2:12PM",
        type: "Offensive Bio / Text",
        status: 'Pending',
    },
    {
        id: 13,
        userName: "Emma Zhang",
        date: "Jul 2, 2:12PM",
        type: "Fake profile or impersonation",
        status: "Actioned",
    },
    {
        id: 14,
        userName: "Martinez",
        date: "Jul 5, 8:16 PM",
        type: "Inappropriate Profile Photo",
        status: 'Pending',
    },
]

export default function Reports() {

    const [filter, setFilter] = useState<string>("All")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredUsers = queue.filter((user) => {
        if (filter === "All") return true
        return user.status === filter
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
                    <h1 className="text-2xl md:text-3xl font-semibold text-white">Reports</h1>

                    {/* Filter */}
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                            {/* <span className="text-sm text-muted-foreground">Filter by:</span>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-[140px] bg-muted border-border">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="VOXA Free">Income Verification</SelectItem>
                                <SelectItem value="VOXA Gold">ID Verification</SelectItem>
                            </SelectContent>
                        </Select> */}

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
                                <TabsTrigger value="tab-2">Pending</TabsTrigger>
                                <TabsTrigger value="tab-3">Approved</TabsTrigger>
                                <TabsTrigger value="tab-4">Dismissed</TabsTrigger>
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
                                    <TableHead className="text-white font-bold text-sm">Date</TableHead>
                                    <TableHead className="text-white font-bold text-sm">Reported User</TableHead>
                                    <TableHead className="text-white font-bold text-sm">Type</TableHead>
                                    <TableHead className="text-white font-bold text-sm">Status</TableHead>


                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.map((user) => (
                                    <TableRow key={user.id} className="border-border hover:bg-muted/50">
                                        <TableCell className="text-sm">{user.date}</TableCell>
                                        <TableCell className="text-white text-sm font-bold">{user.userName}</TableCell>

                                        <TableCell>{user.type}</TableCell>
                                        <TableCell className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium  ${user.status === "Pending"
                                            ? " text-warning"
                                            : user.status === "Actioned"
                                                ? " text-success"
                                                : " "
                                            }`}>{user.status}</TableCell>

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
