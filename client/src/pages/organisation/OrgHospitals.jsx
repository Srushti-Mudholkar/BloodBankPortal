import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";

const OrgHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/inventory/org-hospitals")
      .then(({ data }) => { if (data.success) setHospitals(data.hospitals); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "hospitalName", label: "Hospital Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "website", label: "Website", render: (r) => r.website ? <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">{r.website}</a> : "—" },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Registered Hospitals</h1>
        <p className="text-gray-500 text-sm mt-1">All hospitals in the system</p>
      </div>
      <DataTable title="Hospitals List" columns={columns} data={hospitals} loading={loading} />
    </Layout>
  );
};

export default OrgHospitals;
