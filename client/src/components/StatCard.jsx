import React from "react";

const colors = {
  red:    { bg: "bg-red-50",    icon: "bg-red-100 text-red-600",    text: "text-red-600" },
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-100 text-blue-600",   text: "text-blue-600" },
  green:  { bg: "bg-green-50",  icon: "bg-green-100 text-green-600",  text: "text-green-600" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", text: "text-purple-600" },
  orange: { bg: "bg-orange-50", icon: "bg-orange-100 text-orange-600", text: "text-orange-600" },
};

const StatCard = ({ icon, label, value, color = "red", trend }) => {
  const c = colors[color];
  return (
    <div className={`${c.bg} rounded-2xl p-5 border border-white shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className={`${c.icon} w-11 h-11 rounded-xl flex items-center justify-center text-xl`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className={`text-3xl font-bold ${c.text}`}>{value}</p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
