/**
 * Export any array of objects to a CSV file download
 * @param {Array} data - array of objects
 * @param {Array} columns - [{ key, label }]
 * @param {string} filename - e.g. "inventory-report"
 */
export const exportToCSV = (data, columns, filename = "export") => {
  if (!data || data.length === 0) return;

  const headers = columns.map((c) => c.label).join(",");

  const rows = data.map((row) =>
    columns
      .map((col) => {
        let val = col.csvValue ? col.csvValue(row) : row[col.key];
        if (val === null || val === undefined) val = "";
        // Escape commas and quotes
        val = String(val).replace(/"/g, '""');
        if (val.includes(",") || val.includes("\n") || val.includes('"')) {
          val = `"${val}"`;
        }
        return val;
      })
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
