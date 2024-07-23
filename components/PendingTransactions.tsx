/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1U2LwGaIzQv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

export default function PendingTransaction() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    purpose: "",
    minAmount: 0,
    maxAmount: Infinity,
    startDate: null,
    endDate: null,
    memberName: "",
    accountType: "",
  });
  const handleSearch = (e:any) => setSearch(e.target.value);
  const handleFilterChange = (key:any, value:any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };
  const withdrawalRequests = useMemo(() => {
    return [
      {
        accountNumber: "123456789",
        accountType: "Savings",
        amount: 1000,
        requestDate: "2023-06-01",
        purpose: "Rent Payment",
        memberName: "John Doe",
      },
      {
        accountNumber: "987654321",
        accountType: "Checking",
        amount: 5000,
        requestDate: "2023-06-02",
        purpose: "Medical Expenses",
        memberName: "Jane Smith",
      },
      {
        accountNumber: "456789123",
        accountType: "Business",
        amount: 2500,
        requestDate: "2023-06-03",
        purpose: "Car Repair",
        memberName: "Michael Johnson",
      },
      {
        accountNumber: "321789654",
        accountType: "Savings",
        amount: 750,
        requestDate: "2023-06-04",
        purpose: "Grocery Shopping",
        memberName: "Emily Davis",
      },
      {
        accountNumber: "159753852",
        accountType: "Checking",
        amount: 3000,
        requestDate: "2023-06-05",
        purpose: "Utility Bills",
        memberName: "David Lee",
      },
    ]
      .filter((request) => {
        const searchValue = search.toLowerCase();
        return (
          request.accountNumber.toLowerCase().includes(searchValue) ||
          request.amount.toString().includes(searchValue) ||
          request.requestDate.includes(searchValue) ||
          request.purpose.toLowerCase().includes(searchValue) ||
          request.memberName.toLowerCase().includes(searchValue) ||
          request.accountType.toLowerCase().includes(searchValue)
        );
      })
      .filter((request) => {
        return (
          (filter.purpose === "" ||
            request.purpose
              .toLowerCase()
              .includes(filter.purpose.toLowerCase())) &&
          (filter.accountType === "" ||
            request.accountType
              .toLowerCase()
              .includes(filter.accountType.toLowerCase())) &&
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
  }, [search, filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-pending-withdrawal`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        //  setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    (async () => await fetchData())();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Withdrawals</h1>
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
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests.map((request) => (
                <TableRow key={request.accountNumber}>
                  <TableCell>{request.memberName}</TableCell>
                  <TableCell>{request.accountNumber}</TableCell>
                  <TableCell>{request.accountType}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                       
                        size="sm"
                        onClick={() =>
                          console.log("Approve", request.accountNumber)
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        
                        size="sm"
                        onClick={() =>
                          console.log("Decline", request.accountNumber)
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function FilterIcon(props:any) {
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

function XIcon(props:any) {
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
