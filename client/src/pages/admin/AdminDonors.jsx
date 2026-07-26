import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = () => {
    setLoading(true);
    API.get("/admin/donors")
      .then(({ data }) => { if (data.success) setDonors(data.donors); })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDonors(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;
    try {
      const { data } = await API.delete(`/admin/delete-user/${id}`);
      if (data.success) { toast.success("Donor deleted"); fetchDonors(); }
    } catch { toast.error("Failed to delete"); }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
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
        <h1 className="text-2xl font-bold text-gray-800">All Donors</h1>
        <p className="text-gray-500 text-sm mt-1">Manage registered donors</p>
      </div>
      <DataTable title="Donors" columns={columns} data={donors} loading={loading} />
    </Layout>
  );
};

export default AdminDonors;
