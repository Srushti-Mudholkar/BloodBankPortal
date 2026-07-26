import React, { useState } from "react";
import Layout from "../components/Layout.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice.js";
import API from "../utils/axios.js";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("profile"); // "profile" | "password"

  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || "",
      organisationName: user?.organisationName || "",
      hospitalName: user?.hospitalName || "",
      phone: user?.phone || "",
      address: user?.address || "",
      website: user?.website || "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().min(10, "Min 10 digits").required("Phone is required"),
      address: Yup.string().min(5).required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await API.put("/user/update-profile", values);
        if (data.success) {
          dispatch(loginSuccess({ user: data.user, token }));
          toast.success("Profile updated successfully!");
        } else toast.error(data.message);
      } catch (e) { toast.error(e.response?.data?.message || "Error updating profile"); }
    },
  });

  const passwordFormik = useFormik({
    initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string().min(6, "Min 6 characters").required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await API.put("/user/change-password", values);
        if (data.success) { toast.success("Password changed successfully!"); resetForm(); }
        else toast.error(data.message);
      } catch (e) { toast.error(e.response?.data?.message || "Error changing password"); }
    },
  });

  const displayName = user?.name || user?.organisationName || user?.hospitalName;
  const roleColor = { donor: "bg-red-100 text-red-700", organisation: "bg-blue-100 text-blue-700", hospital: "bg-green-100 text-green-700", admin: "bg-purple-100 text-purple-700" };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all";

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-3xl mx-auto mb-4">
            {displayName?.charAt(0).toUpperCase()}
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{displayName}</h3>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize mt-3 inline-block ${roleColor[user?.role]}`}>
            {user?.role}
          </span>
          {user?.bloodGroup && (
            <div className="mt-4 bg-red-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">Blood Group</p>
              <p className="text-2xl font-extrabold text-red-600">{user.bloodGroup}</p>
            </div>
          )}
          <div className="mt-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📱</span><span>{user?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍</span><span>{user?.address}</span>
            </div>
            {user?.website && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🌐</span>
                <a href={user.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">{user.website}</a>
              </div>
            )}
          </div>
        </div>

        {/* Edit forms */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {["profile", "password"].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize
                  ${tab === t ? "bg-red-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                {t === "profile" ? "✏️ Edit Profile" : "🔒 Change Password"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {tab === "profile" ? (
              <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Edit Profile</h3>

                {(user?.role === "donor" || user?.role === "admin") && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" name="name" value={profileFormik.values.name} onChange={profileFormik.handleChange} className={inputClass} />
                  </div>
                )}
                {user?.role === "organisation" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Organisation Name</label>
                    <input type="text" name="organisationName" value={profileFormik.values.organisationName} onChange={profileFormik.handleChange} className={inputClass} />
                  </div>
                )}
                {user?.role === "hospital" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hospital Name</label>
                    <input type="text" name="hospitalName" value={profileFormik.values.hospitalName} onChange={profileFormik.handleChange} className={inputClass} />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone</label>
                    <input type="text" name="phone" value={profileFormik.values.phone} onChange={profileFormik.handleChange} onBlur={profileFormik.handleBlur} className={inputClass} />
                    {profileFormik.touched.phone && profileFormik.errors.phone && <p className="text-red-500 text-xs mt-1">{profileFormik.errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Address</label>
                    <input type="text" name="address" value={profileFormik.values.address} onChange={profileFormik.handleChange} onBlur={profileFormik.handleBlur} className={inputClass} />
                    {profileFormik.touched.address && profileFormik.errors.address && <p className="text-red-500 text-xs mt-1">{profileFormik.errors.address}</p>}
                  </div>
                </div>

                {(user?.role === "organisation" || user?.role === "hospital") && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Website</label>
                    <input type="text" name="website" value={profileFormik.values.website} onChange={profileFormik.handleChange} className={inputClass} />
                  </div>
                )}

                <button type="submit" disabled={profileFormik.isSubmitting}
                  className="px-8 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold rounded-xl transition-colors text-sm">
                  {profileFormik.isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </form>
            ) : (
              <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Change Password</h3>
                {[
                  { name: "currentPassword", label: "Current Password" },
                  { name: "newPassword", label: "New Password" },
                  { name: "confirmPassword", label: "Confirm New Password" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{f.label}</label>
                    <input type="password" name={f.name}
                      value={passwordFormik.values[f.name]} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur}
                      className={inputClass} placeholder="••••••••" />
                    {passwordFormik.touched[f.name] && passwordFormik.errors[f.name] && (
                      <p className="text-red-500 text-xs mt-1">{passwordFormik.errors[f.name]}</p>
                    )}
                  </div>
                ))}
                <button type="submit" disabled={passwordFormik.isSubmitting}
                  className="px-8 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold rounded-xl transition-colors text-sm">
                  {passwordFormik.isSubmitting ? "Changing..." : "Change Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
