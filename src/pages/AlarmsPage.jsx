import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlarmTable from "../components/Alarms/AlarmTable";
import { fetchAlarms, toggleFavorite, setFavoritesOnly } from "../features/alarms/alarmSlice";
import useDebounce from "../customHooks/useDebounce";

export default function AlarmsPage() {
  const dispatch = useDispatch();
  const { filteredAlarms, favorites, loading, favoritesOnly } = useSelector((s)=> s.alarms);
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 400);

  useEffect(() => {
    // server-side search: dispatch fetchAlarms with search=debounced
    dispatch(fetchAlarms({ search: debounced }));
  }, [dispatch, debounced]);

  const onFavToggle = (id) => dispatch(toggleFavorite(id));
  const onFilterToggle = () => dispatch(setFavoritesOnly(!favoritesOnly));

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Events / Alarms</h2>

      <div className="flex gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by code, description, or site..."
          className="px-3 py-2 rounded bg-gray-100 w-9/10"
        />
        <button onClick={onFilterToggle} className="px-3 py-2 bg-indigo-600 rounded">
          {favoritesOnly ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {loading ? <div>Loading...</div> : <AlarmTable data={filteredAlarms} onFavToggle={onFavToggle} favorites={favorites} />}
    </>
  );
}
