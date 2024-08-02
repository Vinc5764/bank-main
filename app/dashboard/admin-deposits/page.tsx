import AdminDeposit from "@/components/AdminDeposit";
import AdminWithdraw from "@/components/AdminWithdraw";
import React from "react";

const page = () => {
  return (
    <div className=" md:flex items-center  justify-center">
      <AdminDeposit />
      <AdminWithdraw />
    </div>
  );
};

export default page;
