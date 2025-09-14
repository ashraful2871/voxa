"use client";

import { useState, useMemo } from "react";
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
import PageLoading from "@/components/shared/PageLoading";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

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
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const { data: userData } = useUserDetailsQuery(
    selectId ? { id: selectId } : skipToken
  );

  const [filter, setFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  receiveUserData(userData);

  // Filter and search users
  const filteredAndSearchedUsers = useMemo(() => {
    if (!data?.data?.users) return [];

    return data.data.users.filter((user: User) => {
      // Apply plan type filter
      const planFilterMatch = filter === "ALL" || user.voxaPlanType === filter;

      // Apply search term filter
      const searchMatch =
        searchTerm === "" ||
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      return planFilterMatch && searchMatch;
    });
  }, [data, filter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSearchedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredAndSearchedUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (id: string) => {
    setSelectId(id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  return (
    <div className="mx-72">
      <div className="flex justify-center mb-5">
        <div className="relative xl:max-w-3xl lg:max-w-md md:max-w-sm xl:-ml-0 lg:-ml-9 w-full border-white/20 rounded-lg">
          <Input
            className="peer border !border-white/20 text-white ps-9 w-full"
            placeholder="Search by user name, email, or ID"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <IoSearchOutline className="text-white" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl text-secondary bg-foreground p-5 rounded-lg mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            User Management
          </h1>

          {/* Filter and Results Count */}
          <div className="flex items-center justify-between">
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

            <span className="text-sm text-muted-foreground">
              {filteredAndSearchedUsers.length} user(s) found
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card overflow-hidden">
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
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user: User) => (
                    <TableRow
                      onClick={() => handleUser(user?.id)}
                      key={user.id}
                      className="border-border hover:bg-muted/50 cursor-pointer"
                    >
                      <TableCell className="font-bold text-sm text-white">
                        {user.name || "N/A"}
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
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-secondary">
                        {user.warningCount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                    >
                      {searchTerm
                        ? `No users found for "${searchTerm}"`
                        : "No users found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination - Only show if there are results */}
        {filteredAndSearchedUsers.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
