"use client";

import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useTokenStore from "@/lib/store";

export default function CustomerReport() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState({ start: "", end: "" });
  const [filterAmount, setFilterAmount] = useState({ min: "", max: "" });
  const [filterDescription, setFilterDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Added status filter
  const categories = [
    { value: "pending", label: "Pending" },
    { value: "success", label: "Success" },
    { value: "rejected", label: "Rejected" },
  ]; // Added status categories
  const { token, userType, clearToken, name, datas } = useTokenStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://9a14-197-251-205-122.ngrok-free.app/users/reports`,
          {
            params: {
              accountNumber: datas.account.accountNumber,
            },
          }
        );
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        setData(response.data.allTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [datas.account.accountNumber]);

  const filteredTransactions = useMemo(() => {
    return data?.filter((transaction: any) => {
      // Date filtering
      const transactionDate = new Date(
        transaction.dateWithdrawn || transaction.dateDeposited
      );
      const dateMatch =
        (!filterDate.start || transactionDate >= new Date(filterDate.start)) &&
        (!filterDate.end || transactionDate <= new Date(filterDate.end));

      // Amount filtering
      const amount = transaction.amount || 0;
      const amountMatch =
        (!filterAmount.min || amount >= parseFloat(filterAmount.min)) &&
        (!filterAmount.max || amount <= parseFloat(filterAmount.max));

      // Description filtering
      const descriptionMatch = filterDescription
        ? transaction.description
            .toLowerCase()
            .includes(filterDescription.toLowerCase())
        : true;

      // Category filtering (status)
      const statusMatch = filterStatus
        ? transaction.status?.toLowerCase() === filterStatus.toLowerCase()
        : true;

      return dateMatch && amountMatch && descriptionMatch && statusMatch;
    });
  }, [data, filterDate, filterAmount, filterDescription, filterStatus]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleDateFilter = (start: any, end: any) => {
    setFilterDate({ start, end });
    setCurrentPage(1);
  };

  const handleAmountFilter = (min: any, max: any) => {
    setFilterAmount({ min, max });
    setCurrentPage(1);
  };

  const handleDescriptionFilter = (description: any) => {
    setFilterDescription(description);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: any) => {
    setFilterCategory(category);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: any) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleDownload = async () => {
    const input: any = document.querySelector(".w-full.max-w-6xl.mx-auto");

    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("report.pdf");
    } else {
      console.error("Element to download as PDF not found.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transaction Report</h1>
        <p className="text-muted-foreground">
          View and filter your recent transactions.
        </p>
      </div>
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {filterDate?.start && filterDate?.end
                      ? `${filterDate.start} - ${filterDate.end}`
                      : "Select date range"}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    onSelect={(range: any) =>
                      handleDateFilter(range.start, range.end)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="amount-range">Amount Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="amount-min"
                  type="number"
                  placeholder="Min"
                  value={filterAmount.min}
                  onChange={(e) =>
                    handleAmountFilter(e.target.value, filterAmount.max)
                  }
                />
                <Input
                  id="amount-max"
                  type="number"
                  placeholder="Max"
                  value={filterAmount.max}
                  onChange={(e) =>
                    handleAmountFilter(filterAmount.min, e.target.value)
                  }
                />
              </div>
            </div>
            {/* <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Search description"
                value={filterDescription}
                onChange={(e) => handleDescriptionFilter(e.target.value)}
              />
            </div> */}
            <div>
              <Label htmlFor="category">Status</Label>
              <Select
                value={filterStatus}
                onValueChange={(value) => handleStatusFilter(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Number</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems?.map((transaction: any) => (
                <TableRow key={transaction?._id}>
                  <TableCell>{transaction?.accountNumber}</TableCell>
                  <TableCell>${transaction?.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction?.account}</TableCell>
                  <TableCell>
                    <Badge
                      className="bg-green-500 text-white"
                      variant={
                        transaction?.status === "Approved"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {transaction?.status ?? "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {transaction?.dateWithdrawn
                      ? new Date(transaction?.dateWithdrawn).toLocaleDateString()
                      : transaction?.dateDeposited
                      ? new Date(transaction?.dateDeposited).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-muted-foreground">
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
            {filteredTransactions?.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleDownload}>Download Report</Button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: any) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
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
      <path d="m9 18 6-6-6-6" />
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
