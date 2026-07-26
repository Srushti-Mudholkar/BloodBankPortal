import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";

const OrgDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/inventory/org-donors")
      .then(({ data }) => { if (data.success) setDonors(data.donors); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Registered Donors</h1>
        <p className="text-gray-500 text-sm mt-1">All donors in the system</p>
      </div>
      <DataTable title="Donors List" columns={columns} data={donors} loading={loading} />
    </Layout>
  );
};

export default OrgDonors;
