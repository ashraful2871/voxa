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
import { useGetAllUserQuery } from "@/redux/features/userManagement/userManagementApi";

interface User {
  id: string;
  name: string;
  email: string;
  voxaPlanType: string;
  role: string;
  createdAt: string;
  warningCount: number;
}

// const mockUsers: User[] = [
//   {
//     id: 1,
//     name: "Savannah",
//     email: "binhan628@gmail.com",
//     status: "VOXA Free",
//     joined: "17 Oct, 2020",
//     warning: 4,
//   },
//   {
//     id: 2,
//     name: "Jacob Jones",
//     email: "tranthuy.nute@gmail.com",
//     status: "VOXA Free",
//     joined: "22 Oct, 2020",
//     warning: 0,
//   },
//   {
//     id: 3,
//     name: "Eleanor Pena",
//     email: "manhhachkt08@gmail.com",
//     status: "VOXA Free",
//     joined: "1 Feb, 2020",
//     warning: 0,
//   },
//   {
//     id: 4,
//     name: "Luther Logan",
//     email: "danghoang87hl@gmail.com",
//     status: "VOXA Gold",
//     joined: "22 Oct, 2020",
//     warning: 2,
//   },
//   {
//     id: 5,
//     name: "Floyd Miles",
//     email: "tranthuy.nute@gmail.com",
//     status: "VOXA Free",
//     joined: "22 Oct, 2020",
//     warning: 0,
//   },
//   {
//     id: 6,
//     name: "Wade Warren",
//     email: "tienlapspktnd@gmail.com",
//     status: "VOXA Free",
//     joined: "8 Sep, 2020",
//     warning: 1,
//   },
//   {
//     id: 7,
//     name: "Ralph Edwards",
//     email: "ckctm12@gmail.com",
//     status: "VOXA Gold",
//     joined: "8 Sep, 2020",
//     warning: 0,
//   },
//   {
//     id: 8,
//     name: "Ronald Richards",
//     email: "vuhaithuongnute@gmail.com",
//     status: "VOXA Free",
//     joined: "17 Oct, 2020",
//     warning: 0,
//   },
//   {
//     id: 9,
//     name: "Devon Lane",
//     email: "tranthuy.nute@gmail.com",
//     status: "VOXA Free",
//     joined: "24 May, 2020",
//     warning: 1,
//   },
//   {
//     id: 10,
//     name: "Cody Fisher",
//     email: "trungkienspktnd@gmail.com",
//     status: "VOXA Gold",
//     joined: "22 Oct, 2020",
//     warning: 0,
//   },
//   {
//     id: 11,
//     name: "Esther Howard",
//     email: "binhan628@gmail.com",
//     status: "VOXA Gold",
//     joined: "1 Feb, 2020",
//     warning: 3,
//   },
//   {
//     id: 12,
//     name: "Dianne Russell",
//     email: "manhhachkt08@gmail.com",
//     status: "VOXA Free",
//     joined: "22 Oct, 2020",
//     warning: 1,
//   },
//   {
//     id: 13,
//     name: "Annette Black",
//     email: "nvt.isst.nute@gmail.com",
//     status: "VOXA Gold",
//     joined: "21 Sep, 2020",
//     warning: 0,
//   },
//   {
//     id: 14,
//     name: "Arlene McCoy",
//     email: "thuhang.nute@gmail.com",
//     status: "VOXA Free",
//     joined: "8 Sep, 2020",
//     warning: 4,
//   },
// ];

export default function UserManagement() {
  const { data } = useGetAllUserQuery(undefined);
  console.log(data);

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
                    key={user.id}
                    className="border-border hover:bg-muted/50"
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
