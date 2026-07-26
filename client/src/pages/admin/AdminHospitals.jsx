import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const AdminHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = () => {
    setLoading(true);
    API.get("/admin/hospitals")
      .then(({ data }) => { if (data.success) setHospitals(data.hospitals); })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchHospitals(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;
    try {
      const { data } = await API.delete(`/admin/delete-user/${id}`);
      if (data.success) { toast.success("Hospital deleted"); fetchHospitals(); }
    } catch { toast.error("Failed to delete"); }
  };

  const columns = [
    { key: "hospitalName", label: "Hospital Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "website", label: "Website", render: (r) => r.website ? <a href={r.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">{r.website}</a> : "—", csvValue: (r) => r.website || "" },
    {
      key: "action", label: "Action",
      render: (r) => (
        <button onClick={() => handleDelete(r._id)}
          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors">
          Delete
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Hospitals</h1>
        <p className="text-gray-500 text-sm mt-1">Manage registered hospitals</p>
      </div>
      <DataTable title="Hospitals" columns={columns} data={hospitals} loading={loading} />
    </Layout>
  );
};

export default AdminHospitals;
