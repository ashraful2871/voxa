/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import {
  useGetAllUserQuery,
  useUserDetailsQuery,
} from "@/redux/features/userManagement/userManagementApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { receiveUserData } from "@/utils/receiveUserData";

interface User {
  id: string;
  name: string;
  email: string;
  voxaPlanType: string;
  role: string;
  createdAt: string;
  warningCount: number;
}

export default function UserManagement() {
  const [selectId, setSelectId] = useState<string | null>(null);
  const { data } = useGetAllUserQuery(undefined);
  const { data: userData } = useUserDetailsQuery(
    selectId ? { id: selectId } : skipToken
  );
  // console.log(userData);

  receiveUserData(userData);

  const [filter, setFilter] = useState<string>(
    data?.data?.filters?.planType || "ALL"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = data?.data?.users?.filter((user) => {
    if (filter === "ALL") return true;
    return user.voxaPlanType === filter;
  });

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (id: string) => {
    setSelectId(id);
    //receiveUserData(user); // Save only the clicked user
  };

  return (
    <div className="mx-72">
      <div className="w-full max-w-7xl text-secondary bg-foreground p-5 rounded-lg mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            User Management
          </h1>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by:</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px] bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="VOXA_Free">VOXA Free</SelectItem>
                <SelectItem value="VOXA_Gold">VOXA Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className=" bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-white font-bold text-sm">
                    Name
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Email
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Joined
                  </TableHead>
                  <TableHead className="text-white font-bold text-sm">
                    Warning
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user: User) => (
                  <TableRow
                    onClick={() => handleUser(user?.id)}
                    key={user.id}
                    className="border-border hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell className="font-bold text-sm text-white">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          user.voxaPlanType === "VOXA_Gold"
                            ? " text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.voxaPlanType}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="text-secondary">
                      {user.warningCount}
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
