import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";

const DonorHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/inventory/donor-history")
      .then(({ data }) => { if (data.success) setHistory(data.history); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Quantity (units)" },
    { key: "organisation", label: "Organisation", render: (r) => r.organisation?.organisationName || "—", csvValue: (r) => r.organisation?.organisationName || "" },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Donation History</h1>
        <p className="text-gray-500 text-sm mt-1">All your blood donation records</p>
      </div>
      <DataTable title="All Donations" columns={columns} data={history} loading={loading} />
    </Layout>
  );
};

export default DonorHistory;
