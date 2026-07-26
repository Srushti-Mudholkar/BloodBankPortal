import React, { useState, useMemo } from "react";
import EmptyStateIllustration from "../assets/EmptyStateIllustration.jsx";
import { exportToCSV } from "../utils/exportCSV.js";

const DataTable = ({ columns, data, title, loading }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{filtered.length} records found</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 w-full sm:w-48 transition-all"
          />
          {data.length > 0 && (
            <button
              onClick={() => exportToCSV(data, columns.filter((c) => c.key !== "action"), title)}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-xl border border-green-200 transition-colors whitespace-nowrap"
              title="Export to CSV"
            >
              ⬇ CSV
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <EmptyStateIllustration />
            <p className="font-semibold text-gray-500 mt-2">No records found</p>
            <p className="text-xs mt-1">Try adjusting your search</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((row, i) => (
                <tr key={row._id || i} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-gray-700">
                      {col.render ? col.render(row) : row[col.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 disabled:opacity-40 hover:bg-white transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2 py-1.5 text-xs text-gray-400">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                      ${page === p ? "bg-red-600 text-white border-red-600" : "border border-gray-200 hover:bg-white"}`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 disabled:opacity-40 hover:bg-white transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
