import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import StatCard from "../../components/StatCard.jsx";
import API from "../../utils/axios.js";
import AdminIllustration from "../../assets/AdminIllustration.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then(({ data }) => { if (data.success) setStats(data.stats); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard 🛡️</h1>
        <p className="text-gray-500 text-sm mt-1">System-wide overview</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard icon="👤" label="Total Donors" value={stats?.totalDonors || 0} color="red" />
            <StatCard icon="🏥" label="Total Hospitals" value={stats?.totalHospitals || 0} color="blue" />
            <StatCard icon="🏢" label="Total Organisations" value={stats?.totalOrganisations || 0} color="purple" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard icon="⬆️" label="Total Blood In (units)" value={stats?.totalBloodIn || 0} color="green" />
            <StatCard icon="⬇️" label="Total Blood Out (units)" value={stats?.totalBloodOut || 0} color="orange" />
          </div>

          {/* Summary card */}
          <div className="mt-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white flex items-center justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 bottom-0 w-48 opacity-20">
              <AdminIllustration />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Net Blood Available</h3>
              <p className="text-red-100 text-sm mb-3">Across all organisations in the system</p>
              <p className="text-5xl font-bold">{(stats?.totalBloodIn || 0) - (stats?.totalBloodOut || 0)} <span className="text-xl font-normal text-red-200">units</span></p>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AdminDashboard;
