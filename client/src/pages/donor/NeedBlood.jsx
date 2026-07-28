import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const statusBadge = (status) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${map[status]}`}>{status}</span>;
};

const NeedBlood = () => {
  const [requests, setRequests] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [reqRes, orgRes] = await Promise.all([
        API.get("/request/my-requests"),
        API.get("/inventory/organisations"),
      ]);
      // Filter only "donor-need" requests from all my requests
      if (reqRes.data.success) {
        setRequests(reqRes.data.requests.filter((r) => r.requestType === "donor-need"));
      }
      if (orgRes.data.success) setOrgs(orgRes.data.organisations);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const formik = useFormik({
    initialValues: { bloodGroup: "", quantity: "", organisation: "", message: "" },
    validationSchema: Yup.object({
      bloodGroup: Yup.string().required("Blood group is required"),
      quantity: Yup.number().min(1, "Minimum 1 unit").required("Quantity is required"),
      organisation: Yup.string().required("Select an organisation"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await API.post("/request/create", {
          ...values,
          requestType: "donor-need", // explicitly tell backend this is a "need blood" request
        });
        if (data.success) {
          toast.success("Blood request submitted successfully!");
          resetForm();
          fetchData();
        } else toast.error(data.message);
      } catch (e) {
        toast.error(e.response?.data?.message || "Error submitting request");
      }
    },
  });

  const columns = [
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Quantity (units)" },
    { key: "organisation", label: "Organisation", render: (r) => r.organisation?.organisationName || "—", csvValue: (r) => r.organisation?.organisationName || "" },
    { key: "status", label: "Status", render: (r) => statusBadge(r.status), csvValue: (r) => r.status },
    { key: "message", label: "Note", render: (r) => r.message || "—" },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Need Blood</h1>
        <p className="text-gray-500 text-sm mt-1">Request blood from an organisation for yourself or someone else</p>
      </div>

      {/* Request Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-gray-800 text-lg mb-5">Request Blood</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blood Group — any group selectable */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Blood Group Needed</label>
              <div className="grid grid-cols-4 gap-1.5">
                {bloodGroups.map((bg) => (
                  <button type="button" key={bg}
                    onClick={() => formik.setFieldValue("bloodGroup", bg)}
                    className={`py-2 rounded-xl border-2 text-xs font-bold transition-all
                      ${formik.values.bloodGroup === bg ? "border-red-500 bg-red-600 text-white" : "border-gray-200 text-gray-600 hover:border-red-300"}`}>
                    {bg}
                  </button>
                ))}
              </div>
              {formik.touched.bloodGroup && formik.errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{formik.errors.bloodGroup}</p>}
            </div>

            <div className="space-y-4">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quantity (units)</label>
                <input type="number" name="quantity" placeholder="e.g. 2"
                  value={formik.values.quantity} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                {formik.touched.quantity && formik.errors.quantity && <p className="text-red-500 text-xs mt-1">{formik.errors.quantity}</p>}
              </div>

              {/* Organisation */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Organisation</label>
                <select name="organisation" value={formik.values.organisation} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-white">
                  <option value="">Select organisation</option>
                  {orgs.map((o) => <option key={o._id} value={o._id}>{o.organisationName}</option>)}
                </select>
                {formik.touched.organisation && formik.errors.organisation && <p className="text-red-500 text-xs mt-1">{formik.errors.organisation}</p>}
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message <span className="font-normal text-gray-400">(optional)</span></label>
            <input type="text" name="message" placeholder="e.g. Needed urgently for a family member"
              value={formik.values.message} onChange={formik.handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
          </div>

          <button type="submit" disabled={formik.isSubmitting}
            className="px-8 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold rounded-xl transition-colors text-sm">
            {formik.isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      <DataTable title="My Blood Requests" columns={columns} data={requests} loading={loading} />
    </Layout>
  );
};

export default NeedBlood;
