"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SkeletonDemo } from "./Skeleton";
import Image from "next/image";
import noimagedata from "@/public/last image.png";
const baseURL =
 "https://bank-server-7h17.onrender.com";

export default function PendingTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [fetchData, setFetchedData] = useState([]);
  const [filter, setFilter] = useState<any>({
    purpose: "",
    minAmount: 0,
    maxAmount: Infinity,
    startDate: null,
    endDate: null,
    memberName: "",
    accountType: "",
  });

  const handleSearch = (e: any) => setSearch(e.target.value);
  const handleFilterChange = (key: any, value: any) => {
    setFilter((prev: any) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return fetchData
      .filter((request: any) => {
        const searchValue = search?.toLowerCase();
        return (
          request?.accountNumber?.toLowerCase()?.includes(searchValue) ||
          request?.amount?.toString()?.includes(searchValue) ||
          request?.requestDate?.includes(searchValue) ||
          request?.purpose?.toLowerCase()?.includes(searchValue) ||
          request?.memberName?.toLowerCase()?.includes(searchValue) ||
          request?.account?.toLowerCase()?.includes(searchValue)
        );
      })
      .filter((request: any) => {
        return (
          (filter.purpose === "" ||
            request?.purpose
              ?.toLowerCase()
              ?.includes(filter.purpose.toLowerCase())) &&
          (filter?.account === "" ||
            request?.account
              ?.toLowerCase()
              ?.includes(filter.accountType.toLowerCase())) &&
          request.amount >= filter.minAmount &&
          request.amount <= filter.maxAmount &&
          (!filter.startDate ||
            new Date(request.requestDate) >= new Date(filter.startDate)) &&
          (!filter.endDate ||
            new Date(request.requestDate) <= new Date(filter.endDate)) &&
          (filter.memberName === "" ||
            request.memberName
              .toLowerCase()
              .includes(filter.memberName.toLowerCase()))
        );
      });
  }, [search, filter, fetchData]);

  const handleApprove = async (req: any) => {
    try {
      const { accountNumber, reason, account, amount } = req;

      // Create the request body
      const requestBody = JSON.stringify({
        accountNumber,
        reason,
        account,
        amount,
      });

      // Make the POST request with the request body
      const response = await fetch(`${baseURL}/withdrawal/approve/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: requestBody, // Attach the request body
      });

      if (!response.ok) {
        throw new Error("Failed to approve withdrawal");
      }

      // Filter out the approved request from the fetched data
      setFetchedData(
        fetchData.filter((req: any) => req.accountNumber !== accountNumber)
      );
    } catch (error) {
      console.error("Error approving withdrawal:", error);
    }
  };

  const handleReject = async (req: any) => {
    try {
      const { _id } = req;

      const requestBody = JSON.stringify({
        id: _id,
      });
      const response = await fetch(`http://localhost:3001/withdrawal/reject`, {
        method: "POST",
        body: requestBody,
      });
      if (!response.ok) {
        throw new Error("Failed to reject withdrawal");
      }
      setFetchedData(fetchData.filter((req: any) => req?._id !== _id));
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://bank-server-7h17.onrender.com/admin/pendingwithdrawals`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setIsLoading(false);
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-6  text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          Pending Withdrawals
        </h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input
                    id="purpose"
                    value={filter.purpose}
                    onChange={(e) =>
                      handleFilterChange("purpose", e.target.value)
                    }
                    placeholder="Enter purpose"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Input
                    id="account-type"
                    value={filter.accountType}
                    onChange={(e) =>
                      handleFilterChange("accountType", e.target.value)
                    }
                    placeholder="Enter account type"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-amount">Min Amount</Label>
                    <Input
                      id="min-amount"
                      type="number"
                      value={filter.minAmount}
                      onChange={(e) =>
                        handleFilterChange("minAmount", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-amount">Max Amount</Label>
                    <Input
                      id="max-amount"
                      type="number"
                      value={filter.maxAmount}
                      onChange={(e) =>
                        handleFilterChange("maxAmount", Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={filter.startDate || ""}
                      onChange={(e) =>
                        handleFilterChange("startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={filter.endDate || ""}
                      onChange={(e) =>
                        handleFilterChange("endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-name">Member Name</Label>
                  <Input
                    id="member-name"
                    value={filter.memberName}
                    onChange={(e) =>
                      handleFilterChange("memberName", e.target.value)
                    }
                    placeholder="Enter member name"
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card className=" w-[390px] md:w-full">
        <CardContent>
          {isLoading ? (
            <SkeletonDemo />
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col my-8 gap-y-8 items-center justify-center">
              <Image
                src={noimagedata}
                alt="No data fetched"
                className="w-1/3 lg:w-1/12"
              />
              <p className="text-xl font-bold">No data fetched</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Amount(GHS)</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((request: any) => (
                  <TableRow key={request.accountNumber}>
                    <TableCell>{request.accountNumber}</TableCell>
                    <TableCell>{request.account}</TableCell>
                    <TableCell>{request.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(
                        request.dateDeposited || request.dateWithdrawn
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{request.purpose}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request)}
                        >
                          Approve
                        </Button>
                        <Button size="sm" onClick={() => handleReject(request)}>
                          Decline
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
