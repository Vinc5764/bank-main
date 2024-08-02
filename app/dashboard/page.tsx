"use client";

import React, { useEffect, useState } from "react";

import CustomerHome from "@/components/CustomerHome";
import useTokenStore from "@/lib/store";
import AdminHome from "@/components/AminHome";

const HomePage = () => {
  const { userType } = useTokenStore();
  const [resolvedUserType, setResolvedUserType] = useState<string | null>(null);

  useEffect(() => {
    // Set the resolved user type from the store when the component mounts
    if (userType) {
      setResolvedUserType(userType);
    }
  }, [userType]);

  // Handle cases where userType might not be resolved immediately
  if (resolvedUserType === null) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div>
      {resolvedUserType === "customer" ? <CustomerHome /> : <AdminHome />}
    </div>
  );
};

export default HomePage;
