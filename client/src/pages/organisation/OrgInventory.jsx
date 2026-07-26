import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import DataTable from "../../components/DataTable.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../../utils/axios.js";
import toast from "react-hot-toast";

const OrgInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = () => {
    setLoading(true);
    API.get("/inventory/get")
      .then(({ data }) => { if (data.success) setInventory(data.inventory); })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInventory(); }, []);

  const formik = useFormik({
    initialValues: { inventoryType: "in", bloodGroup: "", quantity: "", email: "" },
    validationSchema: Yup.object({
      inventoryType: Yup.string().required(),
      bloodGroup: Yup.string().required("Blood group is required"),
      quantity: Yup.number().min(1, "Min 1 unit").required("Quantity is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await API.post("/inventory/create", values);
        if (data.success) {
          toast.success(data.message);
          resetForm();
          fetchInventory();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error adding record");
      }
    },
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const columns = [
    {
      key: "inventoryType", label: "Type",
      render: (r) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold
          ${r.inventoryType === "in" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {r.inventoryType === "in" ? "⬆ Blood In" : "⬇ Blood Out"}
        </span>
      ),
      csvValue: (r) => r.inventoryType === "in" ? "Blood In" : "Blood Out",
    },
    { key: "bloodGroup", label: "Blood Group", render: (r) => <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">{r.bloodGroup}</span>, csvValue: (r) => r.bloodGroup },
    { key: "quantity", label: "Quantity (units)" },
    { key: "email", label: "Email" },
    {
      key: "person", label: "Donor / Hospital",
      render: (r) => r.inventoryType === "in" ? (r.donor?.name || "—") : (r.hospital?.hospitalName || "—"),
      csvValue: (r) => r.inventoryType === "in" ? (r.donor?.name || "") : (r.hospital?.hospitalName || ""),
    },
    { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), csvValue: (r) => new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Inventory</h1>
        <p className="text-gray-500 text-sm mt-1">Record blood donations and issues</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-gray-800 text-lg mb-5">Add Blood Record</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Type toggle */}
          <div className="flex gap-3 mb-5">
            {[
              { value: "in", label: "⬆ Blood In", desc: "Donation received" },
              { value: "out", label: "⬇ Blood Out", desc: "Issued to hospital" },
            ].map((t) => (
              <button type="button" key={t.value}
                onClick={() => formik.setFieldValue("inventoryType", t.value)}
                className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all
                  ${formik.values.inventoryType === t.value
                    ? t.value === "in" ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}>
                <p>{t.label}</p>
                <p className="text-xs font-normal opacity-70">{t.desc}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
              <div className="grid grid-cols-4 gap-1.5">
                {bloodGroups.map((bg) => (
                  <button type="button" key={bg}
                    onClick={() => formik.setFieldValue("bloodGroup", bg)}
                    className={`py-2 rounded-lg border-2 text-xs font-bold transition-all
                      ${formik.values.bloodGroup === bg
                        ? "border-red-500 bg-red-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-red-300"
                      }`}>
                    {bg}
                  </button>
                ))}
              </div>
              {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.bloodGroup}</p>
              )}
            </div>

            <div className="space-y-4">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity (units)</label>
                <input type="number" name="quantity" placeholder="Enter quantity"
                  value={formik.values.quantity} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.quantity}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {formik.values.inventoryType === "in" ? "Donor Email" : "Hospital Email"}
                </label>
                <input type="email" name="email"
                  placeholder={formik.values.inventoryType === "in" ? "donor@email.com" : "hospital@email.com"}
                  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <button type="submit" disabled={formik.isSubmitting}
            className="mt-5 px-8 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold rounded-xl transition-colors text-sm">
            {formik.isSubmitting ? "Adding..." : "Add Record"}
          </button>
        </form>
      </div>

      <DataTable title="All Inventory Records" columns={columns} data={inventory} loading={loading} />
    </Layout>
  );
};

export default OrgInventory;
