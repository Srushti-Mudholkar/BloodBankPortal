import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../utils/axios.js";
import DonorIllustration from "../../assets/DonorIllustration.jsx";
import HospitalIllustration from "../../assets/HospitalIllustration.jsx";
import OrgIllustration from "../../assets/OrgIllustration.jsx";
import AdminIllustration from "../../assets/AdminIllustration.jsx";

const roleConfig = {
  donor:        { label: "Donor",        icon: "🩸", color: "red",    Illustration: DonorIllustration,    desc: "Join as a blood donor and help save lives" },
  organisation: { label: "Organisation", icon: "🏢", color: "blue",   Illustration: OrgIllustration,      desc: "Manage your blood bank and inventory" },
  hospital:     { label: "Hospital",     icon: "🏥", color: "green",  Illustration: HospitalIllustration, desc: "Request blood for your patients" },
  admin:        { label: "Admin",        icon: "🛡️", color: "purple", Illustration: AdminIllustration,    desc: "Manage the entire BloodCare system" },
};

const colorMap = {
  red:    { border: "border-red-500",    bg: "bg-red-50",    text: "text-red-700",    btn: "from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-red-200",       ring: "focus:ring-red-100 focus:border-red-400" },
  blue:   { border: "border-blue-500",   bg: "bg-blue-50",   text: "text-blue-700",   btn: "from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-200",   ring: "focus:ring-blue-100 focus:border-blue-400" },
  green:  { border: "border-green-500",  bg: "bg-green-50",  text: "text-green-700",  btn: "from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-green-200", ring: "focus:ring-green-100 focus:border-green-400" },
  purple: { border: "border-purple-500", bg: "bg-purple-50", text: "text-purple-700", btn: "from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-purple-200", ring: "focus:ring-purple-100 focus:border-purple-400" },
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const formik = useFormik({
    initialValues: {
      role: "donor", name: "", organisationName: "", hospitalName: "",
      email: "", password: "", address: "", phone: "", bloodGroup: undefined, website: "",
    },
    validationSchema: Yup.object().shape({
      role: Yup.string().required(),
      name: Yup.string().when("role", {
        is: (r) => r === "donor" || r === "admin",
        then: (s) => s.min(2).required("Name is required"),
        otherwise: (s) => s.notRequired(),
      }),
      organisationName: Yup.string().when("role", {
        is: "organisation",
        then: (s) => s.min(2).required("Organisation name is required"),
        otherwise: (s) => s.notRequired(),
      }),
      hospitalName: Yup.string().when("role", {
        is: "hospital",
        then: (s) => s.min(2).required("Hospital name is required"),
        otherwise: (s) => s.notRequired(),
      }),
       email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
      address: Yup.string().min(5).required("Address is required"),
      phone: Yup.string().min(10, "Min 10 digits").required("Phone is required"),
      bloodGroup: Yup.string().when("role", {
        is: "donor",
        then: (s) => s.required("Blood group is required"),
        otherwise: (s) => s.notRequired(),
      }),
    
     
    }),
    onSubmit: async (values) => {
      try {
      //   const payload = { ...values };

      //  if (payload.role !== "donor") {
      //    delete payload.bloodGroup;
      //  }   
        console.log(values);
        const { data } = await API.post("/auth/register", values);
        if (data.success) {
          toast.success("Account created! Please check your email to verify your account.");
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log("this is react speaking")
         console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
       console.log("Message:", error.response?.data?.message);
        toast.error(error.response?.data?.message || "Registration failed");
      }
    },
  });

  const role = formik.values.role;
  const cfg = roleConfig[role];
  const c = colorMap[cfg.color];
  const Illustration = cfg.Illustration;

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all bg-gray-50
    ${formik.touched[field] && formik.errors[field]
      ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
      : `border-gray-200 focus:bg-white focus:ring-2 ${c.ring}`}`;

  const Err = ({ f }) =>
    formik.touched[f] && formik.errors[f]
      ? <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {formik.errors[f]}</p>
      : null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left illustration panel */}
      <div className={`hidden lg:flex lg:w-[42%] flex-col items-center justify-center p-12 relative overflow-hidden
        ${role === "donor" ? "bg-gradient-to-br from-red-700 to-red-500"
        : role === "organisation" ? "bg-gradient-to-br from-blue-700 to-blue-500"
        : role === "hospital" ? "bg-gradient-to-br from-green-700 to-green-500"
        : "bg-gradient-to-br from-purple-700 to-purple-500"}`}>

        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 rounded-full bg-white opacity-5" />

        <div className="relative z-10 text-white text-center max-w-sm">
          <div className="text-6xl mb-4">{cfg.icon}</div>
          <h2 className="text-3xl font-extrabold mb-3">Register as {cfg.label}</h2>
          <p className="text-white/70 text-sm mb-10 leading-relaxed">{cfg.desc}</p>
          <div className="w-full max-w-xs mx-auto">
            <Illustration />
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-[58%] flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-lg py-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🩸</span>
            <span className="text-xl font-bold text-gray-800">BloodCare</span>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm mb-8">Fill in your details to get started</p>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-5">

              {/* Role selector */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Register As</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(roleConfig).map(([val, rc]) => (
                    <button type="button" key={val}
                      onClick={() => formik.setFieldValue("role", val)}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-200
                        ${role === val
                          ? `${colorMap[rc.color].border} ${colorMap[rc.color].bg} ${colorMap[rc.color].text} shadow-sm`
                          : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-white"}`}>
                      <span className="text-lg">{rc.icon}</span>
                      <div className="text-left">
                        <p className="font-bold leading-tight">{rc.label}</p>
                        <p className="text-xs opacity-60 font-normal">{rc.desc.split(" ").slice(0, 3).join(" ")}...</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              {(role === "donor" || role === "admin") && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
                    <input type="text" name="name" placeholder="Enter your full name"
                      value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("name")} />
                  </div>
                  <Err f="name" />
                </div>
              )}

              {/* Organisation Name */}
              {role === "organisation" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Organisation Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🏢</span>
                    <input type="text" name="organisationName" placeholder="Enter organisation name"
                      value={formik.values.organisationName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("organisationName")} />
                  </div>
                  <Err f="organisationName" />
                </div>
              )}

              {/* Hospital Name */}
              {role === "hospital" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Hospital Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🏥</span>
                    <input type="text" name="hospitalName" placeholder="Enter hospital name"
                      value={formik.values.hospitalName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("hospitalName")} />
                  </div>
                  <Err f="hospitalName" />
                </div>
              )}

              {/* Email + Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                    <input type="email" name="email" placeholder="you@example.com"
                      value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("email")} />
                  </div>
                  <Err f="email" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                    <input type={showPwd ? "text" : "password"} name="password" placeholder="Min 6 chars"
                      value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={`${inputClass("password")} pr-10`} />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <Err f="password" />
                </div>
              </div>

              {/* Blood Group — donor only */}
              {role === "donor" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Blood Group</label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map((bg) => (
                      <button type="button" key={bg}
                        onClick={() => formik.setFieldValue("bloodGroup", bg)}
                        className={`py-2.5 rounded-2xl border-2 text-sm font-extrabold transition-all duration-200
                          ${formik.values.bloodGroup === bg
                            ? "border-red-500 bg-red-600 text-white shadow-md shadow-red-200 scale-105"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:border-red-300 hover:bg-red-50"}`}>
                        {bg}
                      </button>
                    ))}
                  </div>
                  <Err f="bloodGroup" />
                </div>
              )}

              {/* Phone + Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📱</span>
                    <input type="text" name="phone" placeholder="10-digit number"
                      value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("phone")} />
                  </div>
                  <Err f="phone" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📍</span>
                    <input type="text" name="address" placeholder="Your address"
                      value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className={inputClass("address")} />
                  </div>
                  <Err f="address" />
                </div>
              </div>

              {/* Website */}
              {(role === "organisation" || role === "hospital") && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Website <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🌐</span>
                    <input type="text" name="website" placeholder="https://example.com"
                      value={formik.values.website} onChange={formik.handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:ring-2 focus:border-gray-400 focus:ring-gray-100 transition-all" />
                  </div>
                </div>
              )}

              <button type="submit" disabled={formik.isSubmitting}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 shadow-lg
                  bg-gradient-to-r ${c.btn} disabled:opacity-60 disabled:cursor-not-allowed`}>
                {formik.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : `Create ${cfg.label} Account →`}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 font-bold hover:text-red-700 transition-colors">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
