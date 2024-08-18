"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SuccessPage from "@/components/SuccessPage";

const Page = ({ params }: any) => {
  const router = useRouter();
  const { reference } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint and parameters
        const response = await axios.get(
          `https://bank-server-7h17.onrender.com/users/reports`,
          {
            params: {
              reference, // Use the reference parameter here
            },
          }
        );
        setData(response.data); // Assuming the response data contains what you need
        setLoading(false);
      } catch (err:any) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [reference]); // Dependency array to refetch data if reference changes

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Page Reference: {reference}</h1>
      {/* Render your data here */}
      <SuccessPage />
    </div>
  );
};

export default Page;
