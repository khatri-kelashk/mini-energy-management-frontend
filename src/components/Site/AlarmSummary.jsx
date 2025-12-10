import React from "react";

export default function AlarmSummary({ stats = {} }) {
  const items = [
    { label: "Site Down", key: "down", color: "bg-red-600" },
    { label: "Critical", key: "critical", color: "bg-orange-600" },
    { label: "Major", key: "major", color: "bg-yellow-500" },
    { label: "Minor", key: "minor", color: "bg-blue-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((it) => (
        <div key={it.key} className={`${it.color} rounded p-4`}>
          <div className="text-2xl font-bold">{stats[it.key] ?? 0}</div>
          <div className="text-sm">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
