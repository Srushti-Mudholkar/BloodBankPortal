import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await API.get("/admin/inventory");
        if (data.success) setInventory(data.inventory);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetchInventory();
  }, []);

  const columns = [
    {
      key: "inventoryType", label: "Type",
      render: (r) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold
          ${r.inventoryType === "in" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {r.inventoryType === "in" ? "Blood In" : "Blood Out"}
        </span>
      ),
      csvValue: (r) => r.inventoryType === "in" ? "Blood In" : "Blood Out",
    },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Qty (units)" },
    { key: "organisation", label: "Organisation", render: (r) => r.organisation?.organisationName || "—", csvValue: (r) => r.organisation?.organisationName || "" },
    {
      key: "person", label: "Donor / Hospital",
      render: (r) => r.inventoryType === "in"
        ? (r.donor?.name || "—")
        : (r.hospital?.hospitalName || r.donor?.name || "—"),
      csvValue: (r) => r.inventoryType === "in"
        ? (r.donor?.name || "")
        : (r.hospital?.hospitalName || r.donor?.name || ""),
    },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Inventory</h1>
        <p className="text-gray-500 text-sm mt-1">Complete blood inventory across all organisations</p>
      </div>
      <DataTable title="Platform Inventory" columns={columns} data={inventory} loading={loading} />
    </Layout>
  );
};

export default AdminInventory;
