import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const statusBadge = (status) => {
  const map = { pending: "bg-yellow-100 text-yellow-700", approved: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700" };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${map[status]}`}>{status}</span>;
};

const OrgRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/request/org-requests");
      if (data.success) setRequests(data.requests);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/request/update-status/${id}`, { status });
      if (data.success) {
        toast.success(`Request ${status} successfully`);
        fetchRequests();
      } else toast.error(data.message);
    } catch (e) { toast.error(e.response?.data?.message || "Error updating request"); }
  };

  const pending = requests.filter((r) => r.status === "pending");
  const others = requests.filter((r) => r.status !== "pending");

  const columns = [
    { key: "requestType", label: "From", render: (r) => <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${r.requestType === "donor" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{r.requestType}</span>, csvValue: (r) => r.requestType },
    { key: "requestedBy", label: "Name", render: (r) => r.requestedBy?.name || r.requestedBy?.hospitalName || "—", csvValue: (r) => r.requestedBy?.name || r.requestedBy?.hospitalName || "" },
    { key: "email", label: "Email", render: (r) => r.requestedBy?.email || "—", csvValue: (r) => r.requestedBy?.email || "" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Qty (units)" },
    { key: "message", label: "Note", render: (r) => r.message || "—" },
    { key: "status", label: "Status", render: (r) => statusBadge(r.status), csvValue: (r) => r.status },
    {
      key: "action", label: "Action",
      render: (r) => r.status === "pending" ? (
        <div className="flex gap-2">
          <button onClick={() => handleStatus(r._id, "approved")}
            className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold rounded-lg transition-colors">
            ✓ Approve
          </button>
          <button onClick={() => handleStatus(r._id, "rejected")}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors">
            ✗ Reject
          </button>
        </div>
      ) : <span className="text-gray-400 text-xs">—</span>,
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blood Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Manage incoming requests from donors and hospitals</p>
      </div>

      {/* Pending count banner */}
      {pending.length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">⏳</span>
          <div>
            <p className="font-bold text-yellow-800">{pending.length} Pending Request{pending.length > 1 ? "s" : ""}</p>
            <p className="text-yellow-600 text-sm">Review and approve or reject below</p>
          </div>
        </div>
      )}

      <DataTable title="All Requests" columns={columns} data={requests} loading={loading} />
    </Layout>
  );
};

export default OrgRequests;
