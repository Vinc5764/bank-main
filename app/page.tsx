import Customers from "@/components/Customers";
import Footers from "@/components/Footers";
import Glance from "@/components/Glance";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurBestResults from "@/components/OurBestResults";
import Partners from "@/components/Partners";
import OurServices from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Customers />
      <Partners />
      <Glance />
      <OurServices />
      <OurBestResults />
      <TeamSection />
      <Newsletter />
      <Footers />
    </div>
  );
};

export default page;
