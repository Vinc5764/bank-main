"use client";
import AdminHome from "@/components/AminHome";
import CustomerHome from "@/components/CustomerHome";
import useTokenStore from "@/lib/store";
import React from "react";

const page = () => {
  // const usertype = localStorage.getItem("usertype");
  const {userType} = useTokenStore() 

  //  const sidebar = token === "customer" ? sidebarLinksCustomer : sidebarLinks;

  return (
    <div>{userType === "customer" ? <CustomerHome /> : <AdminHome />}</div>
  );
};

export default page;
