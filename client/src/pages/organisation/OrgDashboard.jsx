import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useSelector } from "react-redux";
import API from "../../utils/axios.js";
import OrgIllustration from "../../assets/OrgIllustration.jsx";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from "recharts";

const bloodGroupColors = {
  "A+": "bg-red-500", "A-": "bg-red-400", "B+": "bg-blue-500", "B-": "bg-blue-400",
  "AB+": "bg-purple-500", "AB-": "bg-purple-400", "O+": "bg-green-500", "O-": "bg-green-400",
};

const OrgDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [availability, setAvailability] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get("/inventory/availability"), API.get("/inventory/get")])
      .then(([avail, inv]) => {
        if (avail.data.success) setAvailability(avail.data.availability);
        if (inv.data.success) setInventory(inv.data.inventory);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const totalIn = inventory.filter((i) => i.inventoryType === "in").reduce((s, i) => s + i.quantity, 0);
  const totalOut = inventory.filter((i) => i.inventoryType === "out").reduce((s, i) => s + i.quantity, 0);
  const maxAvail = Math.max(...availability.map((a) => a.available), 1);

  return (
    <Layout>
      <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-6 text-white flex items-center justify-between overflow-hidden relative shadow-lg shadow-blue-100">
        <div className="absolute right-0 top-0 bottom-0 w-40 opacity-30">
          <OrgIllustration />
        </div>
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-2xl font-extrabold">{user?.organisationName}</h1>
          <p className="text-blue-100 text-sm mt-1">Blood Bank Dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="⬆️" label="Total Blood In (units)" value={totalIn} color="green" />
        <StatCard icon="⬇️" label="Total Blood Out (units)" value={totalOut} color="red" />
        <StatCard icon="🩸" label="Current Stock (units)" value={totalIn - totalOut} color="blue" />
      </div>

        {/* Blood group availability cards + chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cards */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-5">Blood Group Stock</h3>
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availability.map((item) => (
                  <div key={item.bloodGroup} className="rounded-xl border border-gray-100 p-3 text-center hover:shadow-md transition-shadow">
                    <div className={`${bloodGroupColors[item.bloodGroup]} text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                      {item.bloodGroup}
                    </div>
                    <p className="text-xl font-bold text-gray-800">{item.available}</p>
                    <p className="text-xs text-gray-400">units</p>
                    <span className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full
                      ${item.available > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.available > 0 ? "Available" : "Empty"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-5">Availability Chart</h3>
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={availability} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bloodGroup" tick={{ fontSize: 12, fontWeight: 600 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "10px", border: "1px solid #eee", fontSize: "13px" }}
                    formatter={(v) => [`${v} units`, "Available"]}
                  />
                  <Bar dataKey="available" radius={[6, 6, 0, 0]}>
                    {availability.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.available === 0 ? "#fca5a5" : entry.available < 5 ? "#fb923c" : "#ef4444"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="flex items-center gap-4 mt-3 justify-center text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Good stock</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Low (&lt;5)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-300 inline-block" /> Empty</span>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default OrgDashboard;
