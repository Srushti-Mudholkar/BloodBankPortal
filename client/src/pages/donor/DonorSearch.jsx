import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const statusBadge = (status) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${map[status]}`}>{status}</span>;
};

const DonorSearch = () => {
  const [tab, setTab] = useState("search"); // "search" | "sent" | "received"
  const [donors, setDonors] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Request modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [formData, setFormData] = useState({ bloodGroup: "", quantity: 1, message: "" });

  const fetchDonors = async (bg) => {
    try {
      const query = bg && bg !== "All" ? `?bloodGroup=${encodeURIComponent(bg)}` : "";
      const { data } = await API.get(`/donor-request/donors${query}`);
      if (data.success) setDonors(data.donors);
    } catch (e) { console.log(e); }
  };

  const fetchSent = async () => {
    try {
      const { data } = await API.get("/donor-request/sent");
      if (data.success) setSentRequests(data.requests);
    } catch (e) { console.log(e); }
  };

  const fetchReceived = async () => {
    try {
      const { data } = await API.get("/donor-request/received");
      if (data.success) setReceivedRequests(data.requests);
    } catch (e) { console.log(e); }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchDonors(filter), fetchSent(), fetchReceived()]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // Re-fetch donors when filter changes
  useEffect(() => { fetchDonors(filter); }, [filter]);

  // Send request to a donor
  const handleSendRequest = async () => {
    if (!formData.bloodGroup) return toast.error("Select a blood group");
    if (!formData.quantity || formData.quantity < 1) return toast.error("Quantity must be at least 1");
    try {
      const { data } = await API.post("/donor-request/create", {
        bloodGroup: formData.bloodGroup,
        quantity: Number(formData.quantity),
        message: formData.message,
        targetDonor: selectedDonor._id,
      });
      if (data.success) {
        toast.success("Request sent!");
        setShowModal(false);
        setFormData({ bloodGroup: "", quantity: 1, message: "" });
        fetchSent();
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error sending request");
    }
  };

  // Respond to a received request
  const handleRespond = async (id, status) => {
    let responseMessage = "";
    if (status === "rejected") {
      responseMessage = prompt("Reason for rejecting (optional):") || "";
    }
    try {
      const { data } = await API.put(`/donor-request/respond/${id}`, { status, responseMessage });
      if (data.success) {
        toast.success(`Request ${status}`);
        fetchReceived();
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error responding");
    }
  };

  // Open send request modal
  const openModal = (donor) => {
    setSelectedDonor(donor);
    setFormData({ bloodGroup: donor.bloodGroup, quantity: 1, message: "" });
    setShowModal(true);
  };

  // --- COLUMNS ---
  const donorColumns = [
    { key: "name", label: "Name" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    {
      key: "action", label: "Action",
      render: (r) => (
        <button onClick={() => openModal(r)}
          className="px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors">
          Request Blood
        </button>
      ),
    },
  ];

  const sentColumns = [
    { key: "targetDonor", label: "Donor", render: (r) => r.targetDonor?.name || "—", csvValue: (r) => r.targetDonor?.name || "" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Qty" },
    { key: "status", label: "Status", render: (r) => statusBadge(r.status), csvValue: (r) => r.status },
    { key: "responseMessage", label: "Response", render: (r) => r.responseMessage || "—" },
    {
      key: "contact", label: "Contact",
      render: (r) => r.status === "accepted" ? (
        <div className="text-xs">
          <p className="text-green-700 font-medium">{r.targetDonor?.phone}</p>
          <p className="text-gray-500">{r.targetDonor?.email}</p>
        </div>
      ) : <span className="text-gray-400 text-xs">Available after acceptance</span>,
      csvValue: (r) => r.status === "accepted" ? r.targetDonor?.phone || "" : "",
    },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  const receivedColumns = [
    { key: "requestedBy", label: "From", render: (r) => r.requestedBy?.name || "—", csvValue: (r) => r.requestedBy?.name || "" },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Qty" },
    { key: "message", label: "Note", render: (r) => r.message || "—" },
    { key: "status", label: "Status", render: (r) => statusBadge(r.status), csvValue: (r) => r.status },
    {
      key: "action", label: "Action",
      render: (r) => r.status === "pending" ? (
        <div className="flex gap-2">
          <button onClick={() => handleRespond(r._id, "accepted")}
            className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold rounded-lg transition-colors">
            Accept
          </button>
          <button onClick={() => handleRespond(r._id, "rejected")}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors">
            Reject
          </button>
        </div>
      ) : <span className="text-gray-400 text-xs">—</span>,
    },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  const tabs = [
    { id: "search", label: "Browse Donors", count: donors.length },
    { id: "sent", label: "Sent Requests", count: sentRequests.length },
    { id: "received", label: "Received Requests", count: receivedRequests.length },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find Donors</h1>
        <p className="text-gray-500 text-sm mt-1">Browse donors by blood group and send help requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${tab === t.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {t.label} {t.count > 0 && <span className="ml-1 text-xs opacity-75">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* Search tab — blood group filter */}
      {tab === "search" && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {bloodGroups.map((bg) => (
              <button key={bg} onClick={() => setFilter(bg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2
                  ${filter === bg ? "border-red-500 bg-red-600 text-white" : "border-gray-200 text-gray-600 hover:border-red-300"}`}>
                {bg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab content */}
      {tab === "search" && <DataTable title="Available Donors" columns={donorColumns} data={donors} loading={loading} />}
      {tab === "sent" && <DataTable title="Requests I Sent" columns={sentColumns} data={sentRequests} loading={loading} />}
      {tab === "received" && <DataTable title="Requests For Me" columns={receivedColumns} data={receivedRequests} loading={loading} />}

      {/* Send Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Request Blood</h3>
            <p className="text-sm text-gray-500 mb-5">Sending request to <span className="font-semibold text-gray-700">{selectedDonor?.name}</span></p>

            <div className="space-y-4">
              {/* Blood Group — locked to target donor's group */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Blood Group</label>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-red-200 bg-red-50 w-fit">
                  <span className="text-lg font-extrabold text-red-600">{formData.bloodGroup}</span>
                  <span className="text-xs text-red-400 font-medium">Donor's registered blood group</span>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quantity (units)</label>
                <input type="number" min="1" value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message <span className="font-normal text-gray-400">(optional)</span></label>
                <input type="text" placeholder="e.g. Needed urgently for surgery"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSendRequest}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DonorSearch;
