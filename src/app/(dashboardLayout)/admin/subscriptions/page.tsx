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
import { FiPlus } from "react-icons/fi"

interface User {
    id: number
    userName: string
    plan: string
    startDate: string
    status: 'Active' | 'Cancelled' | '---'
    renewal: string
}

const queue: User[] = [
    { id: 1, userName: "Mark Thompson", renewal: "Feb 15", status: 'Active', plan: "Monthly", startDate: "Apr 12" },
    {
        id: 2,
        userName: "Luther Logan",
        plan: "Monthly",
        startDate: "Jun 15",
        status: "Cancelled",
        renewal: "Feb 15"
    },
    {
        id: 3,
        userName: "Yu Nakamura",
        plan: "Free",
        startDate: "---",
        status: "---",
        renewal: '---'
    },
    {
        id: 4,
        userName: "Mike Barlow",
        status: "---",
        plan: "Monthly",
        startDate: "Jun 15",
        renewal: '---'
    },
    {
        id: 5,
        userName: "Luther Logan",
        plan: "Monthly",
        startDate: "Apr 12",
        status: 'Active',
        renewal: "Feb 15"
    },
    {
        id: 6,
        userName: "Mike Barlow",
        plan: "Free",
        startDate: "Jun 15",
        status: "Cancelled",
        renewal: '---'
    },
    { id: 7, userName: "Mark Thompson", renewal: '---', status: "Cancelled", plan: "Monthly", startDate: "Apr 12" },
    {
        id: 8,
        userName: "Yu Nakamura",
        plan: "free",
        startDate: "---",
        status: "Cancelled",
        renewal: "Feb 15"
    },
    {
        id: 9,
        userName: "Luther Logan",
        plan: "Jul 5, 8:16 PM",
        startDate: "Apr 12",
        status: 'Active',
        renewal: '---'
    },
    {
        id: 10,
        userName: "Emma Zhang",
        plan: "Monthly",
        startDate: "---",
        status: "Cancelled",
        renewal: "Feb 15"
    },
    {
        id: 11,
        userName: "John Reynolds",
        plan: "Monthly",
        startDate: "Apr 12",
        status: "---",
        renewal: '---'
    },
    {
        id: 12,
        userName: "John Reynolds",
        plan: "Monthly",
        startDate: "Apr 12",
        status: 'Active',
        renewal: '---'
    },
    {
        id: 13,
        userName: "Emma Zhang",
        plan: "Monthly",
        startDate: "---",
        status: "Cancelled",
        renewal: "Feb 15"
    },
    {
        id: 14,
        userName: "Martinez",
        plan: "Jul 5, 8:16 PM",
        startDate: "Jun 15",
        status: 'Active',
        renewal: '---'
    },
]



export default function Subscriptions() {

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
            <div className="w-full max-w-7xl  mx-auto">
                <div className="grid xl:grid-cols-12 lg:grid-cols-6 gap-9 mb-10">
                    <div className="col-span-3 border py-5 px-5 border-secondary rounded-lg bg-foreground">
                        <h2 className='text-white font-bold'>Monthly</h2>
                        <p className="text-3xl text-white font-light">$9.99</p>
                    </div>
                    <div className="col-span-3 border py-5 px-5 border-secondary rounded-lg bg-foreground">
                        <h2 className='text-white font-bold'>Quarterly</h2>
                        <p className="text-3xl text-white font-light">$24.99</p>
                    </div>
                    <div className="col-span-3 border py-5 px-5 border-secondary rounded-lg bg-foreground">
                        <h2 className='text-white font-bold'>Monthly</h2>
                        <p className="text-3xl text-white font-light">$99.99</p>
                    </div>
                    <div className="col-span-3 py-5 px-5 border border-secondary rounded-lg bg-foreground">
                        <FiPlus className="text-warning text-2xl" />
                        <p className="font-bold text-white">Add New Plan</p>
                    </div>
                </div>

                <div className=" text-secondary bg-foreground p-5 rounded-lg space-y-6">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-2xl md:text-3xl font-semibold text-white">Verification Queue</h1>

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
                                        <SelectItem value="VOXA Free">VOXA Free</SelectItem>
                                        <SelectItem value="VOXA Gold">VOXA Gold</SelectItem>
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
                                    <TabsTrigger value="tab-2">Pending</TabsTrigger>
                                    <TabsTrigger value="tab-3">Approved</TabsTrigger>
                                    <TabsTrigger value="tab-4">Rejected</TabsTrigger>
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
                                        <TableHead className="text-white font-bold text-sm">User</TableHead>
                                        <TableHead className="text-white font-bold text-sm">Plan</TableHead>
                                        <TableHead className="text-white font-bold text-sm">Status</TableHead>
                                        <TableHead className="text-white font-bold text-sm">Start Date</TableHead>
                                        <TableHead className="text-white text-end font-bold text-sm">Renewal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedUsers.map((user) => (
                                        <TableRow key={user.id} className="border-border hover:bg-muted/50">
                                            <TableCell className="text-white text-sm font-bold">{user.userName}</TableCell>

                                            <TableCell>{user.startDate}</TableCell>
                                            <TableCell className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium  ${user.status === "Active"
                                                ? " text-success"
                                                : " "
                                                }`}>{user.status}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.startDate}</TableCell>
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
        </div>
    )
}
