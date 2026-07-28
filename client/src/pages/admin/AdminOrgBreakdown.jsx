import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import API from "../../utils/axios.js";

const AdminOrgBreakdown = () => {
  const [breakdown, setBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakdown = async () => {
      try {
        const { data } = await API.get("/admin/org-breakdown");
        if (data.success) setBreakdown(data.breakdown);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetchBreakdown();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Organisation Blood Stock</h1>
        <p className="text-gray-500 text-sm mt-1">Blood group wise inventory for each organisation</p>
      </div>

      {breakdown.length === 0 ? (
        <p className="text-gray-400 text-sm">No organisations found.</p>
      ) : (
        <div className="space-y-6">
          {breakdown.map((org) => (
            <div key={org._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {org.organisationName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{org.organisationName}</h3>
                  <p className="text-xs text-gray-500">{org.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {org.stocks.map((s) => (
                  <div key={s.bloodGroup} className={`rounded-xl border p-3 text-center ${s.available > 0 ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
                    <p className="text-lg font-extrabold text-red-600">{s.bloodGroup}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-green-600">In: <span className="font-bold">{s.in}</span></p>
                      <p className="text-red-600">Out: <span className="font-bold">{s.out}</span></p>
                      <p className={`font-bold text-sm ${s.available > 0 ? "text-green-700" : "text-gray-400"}`}>
                        Available: {s.available}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default AdminOrgBreakdown;
