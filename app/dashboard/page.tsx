"use client";
import AdminHome from "@/components/AminHome";
import CustomerHome from "@/components/CustomerHome";
import React from "react";

const page = () => {
  const usertype = localStorage.getItem("usertype");

  //  const sidebar = token === "customer" ? sidebarLinksCustomer : sidebarLinks;

  return (
    <div>{usertype === "customer" ? <CustomerHome /> : <AdminHome />}</div>
  );
};

export default page;
