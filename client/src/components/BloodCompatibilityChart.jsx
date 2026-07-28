import React from "react";

const compatibility = {
  "O-":  { donateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], receiveFrom: ["O-"] },
  "O+":  { donateTo: ["O+", "A+", "B+", "AB+"], receiveFrom: ["O-", "O+"] },
  "A-":  { donateTo: ["A-", "A+", "AB-", "AB+"], receiveFrom: ["O-", "A-"] },
  "A+":  { donateTo: ["A+", "AB+"], receiveFrom: ["O-", "O+", "A-", "A+"] },
  "B-":  { donateTo: ["B-", "B+", "AB-", "AB+"], receiveFrom: ["O-", "B-"] },
  "B+":  { donateTo: ["B+", "AB+"], receiveFrom: ["O-", "O+", "B-", "B+"] },
  "AB-": { donateTo: ["AB-", "AB+"], receiveFrom: ["O-", "A-", "B-", "AB-"] },
  "AB+": { donateTo: ["AB+"], receiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] },
};

const allGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

const BloodCompatibilityChart = ({ highlightGroup }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 text-lg mb-1">Blood Compatibility Chart</h3>
      <p className="text-gray-500 text-xs mb-5">Who can donate to whom</p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-gray-500 font-semibold">Blood Group</th>
              <th className="text-left py-2 px-2 text-green-600 font-semibold">Can Donate To</th>
              <th className="text-left py-2 px-2 text-blue-600 font-semibold">Can Receive From</th>
            </tr>
          </thead>
          <tbody>
            {allGroups.map((bg) => (
              <tr key={bg} className={`border-b border-gray-50 ${highlightGroup === bg ? "bg-red-50" : ""}`}>
                <td className="py-2.5 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                    ${highlightGroup === bg ? "bg-red-600 text-white" : "bg-red-100 text-red-700"}`}>
                    {bg}
                  </span>
                </td>
                <td className="py-2.5 px-2">
                  <div className="flex flex-wrap gap-1">
                    {compatibility[bg].donateTo.map((g) => (
                      <span key={g} className="px-1.5 py-0.5 rounded text-xs bg-green-50 text-green-700 font-medium">{g}</span>
                    ))}
                  </div>
                </td>
                <td className="py-2.5 px-2">
                  <div className="flex flex-wrap gap-1">
                    {compatibility[bg].receiveFrom.map((g) => (
                      <span key={g} className="px-1.5 py-0.5 rounded text-xs bg-blue-50 text-blue-700 font-medium">{g}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 text-xs text-gray-400">
        <span><span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-1"></span>Your blood group</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>Can donate to</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>Can receive from</span>
      </div>
    </div>
  );
};

export default BloodCompatibilityChart;
