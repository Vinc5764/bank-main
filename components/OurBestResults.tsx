import React from "react";

interface ResultProps {
  value: string;
  label: string;
}

const ResultItem: React.FC<ResultProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl font-bold mb-2">{value}</p>
    <p className="text-sm text-gray-600 uppercase">{label}</p>
  </div>
);

const OurBestResults: React.FC = () => {
  const results = [
    { value: "57.6 bn", label: "Loan Portfolio" },
    { value: "0.95%", label: "Classified Loan Portfolio" },
    { value: "388.5%", label: "Classified Loan Coverage" },
    { value: "50.4 bn", label: "Deposit" },
    { value: "6.1 bn", label: "Shareholders Equity" },
    { value: "18.51%", label: "Capital Adequacy Ratio" },
    { value: "8.5 bn", label: "Market Capitalization" },
    { value: "AAA", label: "Credit Rating" },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Our best results for the year
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, dapibus
          mattis vel feugiat erat tortor eleifend.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map((result, index) => (
            <ResultItem key={index} {...result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBestResults;
