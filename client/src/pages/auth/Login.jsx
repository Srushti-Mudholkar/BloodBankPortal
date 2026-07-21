import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "../../utils/axios.js";
import { loginStart, loginSuccess, loginFailure } from "../../redux/authSlice.js";
import HeroIllustration from "../../assets/HeroIllustration.jsx";

const roleRedirect = {
  donor: "/donor/dashboard",
  organisation: "/organisation/dashboard",
  hospital: "/hospital/dashboard",
  admin: "/admin/dashboard",
};

const roles = [
  { value: "donor",        label: "Donor",        icon: "🩸", color: "peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700" },
  { value: "organisation", label: "Organisation",  icon: "🏢", color: "peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700" },
  { value: "hospital",     label: "Hospital",      icon: "🏥", color: "peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700" },
  { value: "admin",        label: "Admin",         icon: "🛡️", color: "peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700" },
];

const Login = () => {
  // Gives us the dispatch function to send actions to Redux
// Example: dispatch(loginStart()), dispatch(loginSuccess())
// dispatch → only talks to REDUX store
// API.post → talks to the backend

  const dispatch = useDispatch();
 // Used to change pages after successful login
  const navigate = useNavigate();
  // Reads data from Redux Store (Global State)
// We only need 'loading' from auth state here
  const { loading } = useSelector((s) => s.auth);
  // Local UI state only (not Redux)
// Controls whether password is visible or hidden
  const [showPwd, setShowPwd] = useState(false);

  const formik = useFormik({
    initialValues: { role: "donor", email: "", password: "" },
    // Frontend validation
  // Stops invalid data before sending API request
    validationSchema: Yup.object({
      role: Yup.string().required(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    }),
    // Runs only after Formik validation passes
  // 'values' = everything user typed in the form
    onSubmit: async (values) => {
       // Tell Redux: Login process has started
    // Reducer will make loading = true
      dispatch(loginStart());
      try {
          // Send form data (values) to backend
        const { data } = await API.post("/auth/login", values);
        if (data.success) {
           // Store logged-in user & token in Redux
        // ProtectedRoute later reads these values
          dispatch(loginSuccess({ user: data.user, token: data.token }));
            // Get correct name according to user role
          const name = data.user.name || data.user.organisationName || data.user.hospitalName;
           
        // Success notification
          toast.success(`Welcome back, ${name}! 🩸`);
          navigate(roleRedirect[data.user.role]);
        } else {
            // Store login error in Redux
          dispatch(loginFailure(data.message));
           // Show error notification
          toast.error(data.message);
        }
      } catch (err) {
         // Handle unexpected server/network errors
        const msg = err.response?.data?.message || "Login failed";
        // Save error in Redux
        dispatch(loginFailure(msg));
         // Show error notification
        toast.error(msg);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* ── Left hero panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col items-center justify-center"
        style={{ background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #ef4444 100%)" }}>

        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full bg-white opacity-5" />
        <div className="absolute top-1/3 right-[-40px] w-48 h-48 rounded-full bg-white opacity-5" />

        <div className="relative z-10 px-12 text-white max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">🩸</div>
            <span className="text-2xl font-bold tracking-wide">BloodCare</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Every Drop<br />
            <span className="text-red-200">Saves a Life</span>
          </h1>
          <p className="text-red-100 text-base leading-relaxed mb-10">
            Connecting donors, hospitals and organisations to build a smarter, faster blood supply network.
          </p>

          {/* Illustration */}
          <div className="w-full max-w-sm mx-auto drop-shadow-2xl">
            <HeroIllustration />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { v: "500+",  l: "Donors" },
              { v: "120+",  l: "Hospitals" },
              { v: "2000+", l: "Lives Saved" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                <p className="text-2xl font-bold">{s.v}</p>
                <p className="text-red-200 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <span className="text-3xl">🩸</span>
            <span className="text-2xl font-bold text-red-600">BloodCare</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in</h2>
            <p className="text-gray-500 mt-1 text-sm">Welcome back — select your role to continue</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {/* Role cards */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Login As</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => (
                    <button type="button" key={r.value}
                      onClick={() => formik.setFieldValue("role", r.value)}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-200
                        ${formik.values.role === r.value
                          ? r.value === "donor"        ? "border-red-500 bg-red-50 text-red-700 shadow-sm shadow-red-100"
                          : r.value === "organisation" ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
                          : r.value === "hospital"     ? "border-green-500 bg-green-50 text-green-700 shadow-sm shadow-green-100"
                          :                              "border-purple-500 bg-purple-50 text-purple-700 shadow-sm shadow-purple-100"
                          : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-white"
                        }`}>
                      <span className="text-lg">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                  <input type="email" name="email" placeholder="you@example.com"
                    value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all
                      ${formik.touched.email && formik.errors.email
                        ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"}`} />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {formik.errors.email}</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" className="text-xs text-red-500 hover:text-red-700 font-medium">Forgot password?</Link>
              </div>
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                  <input type={showPwd ? "text" : "password"} name="password" placeholder="Enter your password"
                    value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-12 py-3 rounded-2xl border text-sm outline-none transition-all
                      ${formik.touched.password && formik.errors.password
                        ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"}`} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm transition-colors">
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {formik.errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 shadow-lg shadow-red-200
                  bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : "Sign In →"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-600 font-bold hover:text-red-700 transition-colors">
                  Create one free →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
