/**
 * v0 by Vercel.
 * @see https://v0.dev/t/j2fEyrPrHq8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonDemo } from "./Skeleton";
import Image from "next/image";
import nodataImage from "@/public/last image.png";

export default function MemberList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [isloading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://bank-payment-server.onrender.com/admin/members`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setIsLoading(false);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditCustomer = async (updatedMember: any) => {
    console.log(updatedMember);

    try {
      await axios.put(
        `https://4195-102-176-65-181.ngrok-free.app/admin/member/${updatedMember?._id}`,
        {
          name: updatedMember.name,
          email: updatedMember.email,
          accountNumber: updatedMember.accountNumber,
          balance: updatedMember.balance,
          password: updatedMember.password,
        }
      );

      const updatedMembers: any = members.map((m: any) =>
        m._id === updatedMember._id ? updatedMember : m
      );
      setMembers(updatedMembers);
      setEditingMember(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteCustomer = async (memberId: any) => {
    try {
      await axios.delete(
        `https://bank-payment-server.onrender.com/users/delete/${memberId}`
      );

      const updatedMembers = members.filter((m: any) => m.id !== memberId);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const filteredMembers = members?.filter((member: any) =>
    member?.email?.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
  };

  const handleSave = () => {
    if (editingMember) {
      handleEditCustomer(editingMember);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bank Members</h1>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        {isloading ? (
          <SkeletonDemo />
        ) : currentMembers.length === 0 ? (
          <div className="flex flex-col my-8 gap-y-8 items-center justify-center">
            <Image
              src={nodataImage}
              alt="No data fetched"
              className="w-1/3 lg:w-1/12"
            />
            <p className="text-xl font-bold">No data fetched</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMembers.map((member: any) => (
                <TableRow key={member?.id}>
                  {editingMember?._id === member?._id ? (
                    <>
                      <TableCell>
                        <Input
                          type="text"
                          defaultValue={member.name}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              name: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="email"
                          defaultValue={member.email}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              email: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          defaultValue={member.accountNumber}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              accountNumber: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={member.balance}
                          onChange={(e) =>
                            setEditingMember({
                              ...editingMember,
                              balance: parseFloat(e.target.value),
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingMember(null)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{member?.name}</TableCell>
                      <TableCell>{member?.email}</TableCell>
                      <TableCell>{member?.accountNumber}</TableCell>
                      <TableCell>${member?.balance?.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(member)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCustomer(member.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                // disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                // disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
