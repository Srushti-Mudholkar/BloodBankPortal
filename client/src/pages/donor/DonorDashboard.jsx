import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import StatCard from "../../components/StatCard.jsx";
import DataTable from "../../components/DataTable.jsx";
import { useSelector } from "react-redux";
import API from "../../utils/axios.js";
import DonorIllustration from "../../assets/DonorIllustration.jsx";

const DonorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/inventory/donor-history")
      .then(({ data }) => { if (data.success) setHistory(data.history); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const totalDonated = history.reduce((s, h) => s + h.quantity, 0);

  const columns = [
    { key: "bloodGroup", label: "Blood Group", render: (r) => <BloodBadge group={r.bloodGroup} />, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Quantity (units)" },
    { key: "organisation", label: "Organisation", render: (r) => r.organisation?.organisationName || "—", csvValue: (r) => r.organisation?.organisationName || "" },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <Layout>
      <div className="mb-6 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-6 text-white flex items-center justify-between overflow-hidden relative shadow-lg shadow-red-100">
        <div className="absolute right-0 top-0 bottom-0 w-40 opacity-30">
          <DonorIllustration />
        </div>
        <div className="relative z-10">
          <p className="text-red-100 text-sm font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-2xl font-extrabold">{user?.name}</h1>
          <p className="text-red-100 text-sm mt-1">Blood Group: <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">{user?.bloodGroup || "N/A"}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="🩸" label="Total Units Donated" value={totalDonated} color="red" />
        <StatCard icon="📋" label="Donation Records" value={history.length} color="blue" />
        <StatCard icon="🅱️" label="Your Blood Group" value={user?.bloodGroup || "N/A"} color="green" />
      </div>

      <DataTable title="Donation History" columns={columns} data={history} loading={loading} />
    </Layout>
  );
};

const BloodBadge = ({ group }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
    {group}
  </span>
);

export default DonorDashboard;
