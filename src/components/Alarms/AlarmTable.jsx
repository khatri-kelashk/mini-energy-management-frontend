import React from "react";

export default function AlarmTable({ data = [], onFavToggle, favorites = [] }) {
  return (
    <div className="bg-gray-800 rounded p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-300">
            <th className="p-2">Fav</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Site</th>
            <th className="p-2">Event</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="border-t text-gray-300 border-gray-700 hover:bg-gray-700">
              <td className="p-2">
                <button onClick={() => onFavToggle(a.id)} className="text-yellow-400">
                  {favorites.includes(a.id) ? "★" : "☆"}
                </button>
              </td>
              <td className="p-2">{a.severity}</td>
              <td className="p-2">{a.site}</td>
              <td className="p-2">{a.description}</td>
              <td className="p-2">{new Date(a.time).toLocaleString()}</td>
            </tr>
          ))}
          {
            data.length === 0 && (
              <tr className="border-t text-gray-300 border-gray-700 hover:bg-gray-700">
                <td colSpan={5} className="p-2 text-center">No alarms found</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
