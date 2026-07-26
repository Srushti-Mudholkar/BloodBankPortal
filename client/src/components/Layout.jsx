import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";
import toast from "react-hot-toast";

const navLinks = {
  donor: [
    { to: "/donor/dashboard",  label: "Dashboard",        icon: "🏠" },
    { to: "/donor/history",    label: "Donation History",  icon: "📋" },
    { to: "/donor/requests",   label: "My Requests",       icon: "🩸" },
    { to: "/profile",          label: "My Profile",        icon: "👤" },
  ],
  organisation: [
    { to: "/organisation/dashboard", label: "Dashboard",         icon: "🏠" },
    { to: "/organisation/inventory", label: "Manage Inventory",  icon: "🩸" },
    { to: "/organisation/requests",  label: "Blood Requests",    icon: "📥" },
    { to: "/organisation/donors",    label: "Donors",            icon: "👤" },
    { to: "/organisation/hospitals", label: "Hospitals",         icon: "🏥" },
    { to: "/profile",                label: "My Profile",        icon: "⚙️" },
  ],
  hospital: [
    { to: "/hospital/dashboard", label: "Dashboard",       icon: "🏠" },
    { to: "/hospital/requests",  label: "Blood Requests",  icon: "🩸" },
    { to: "/hospital/history",   label: "Request History", icon: "📋" },
    { to: "/profile",            label: "My Profile",      icon: "👤" },
  ],
  admin: [
    { to: "/admin/dashboard",     label: "Dashboard",     icon: "🏠" },
    { to: "/admin/donors",        label: "Donors",        icon: "👤" },
    { to: "/admin/hospitals",     label: "Hospitals",     icon: "🏥" },
    { to: "/admin/organisations", label: "Organisations", icon: "🏢" },
    { to: "/profile",             label: "My Profile",    icon: "⚙️" },
  ],
};

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const links = navLinks[user?.role] || [];
  const displayName = user?.name || user?.organisationName || user?.hospitalName || "User";

  const roleBadgeColor = {
    donor: "bg-red-100 text-red-700",
    organisation: "bg-blue-100 text-blue-700",
    hospital: "bg-green-100 text-green-700",
    admin: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 flex flex-col transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 bg-red-600">
          <span className="text-2xl">🩸</span>
          <span className="text-xl font-bold tracking-wide">BloodCare</span>
        </div>

        {/* User info */}
        <div className="px-5 py-4 border-b border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Logged in as</p>
          <p className="font-semibold text-white truncate">{displayName}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize mt-1 inline-block ${roleBadgeColor[user?.role]}`}>
            {user?.role}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all
                ${isActive
                  ? "bg-red-600 text-white border-l-4 border-red-300"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button
            className="lg:hidden text-gray-600 text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-lg">🩸 BloodCare</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
