import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSite } from "../features/site/siteSlice";
import AlarmSummary from "../components/Site/AlarmSummary";
import EnergyChart from "../components/Site/EnergyChart";
import TicketDrawer from "../components/Site/TicketDrawer";

export default function SiteDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { siteInfo, alarmSummary, energyStats, loading } = useSelector((s) => s.site);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSite(id));    
  }, [dispatch, id]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{siteInfo?.name ?? `Site ${id}`}</h2>
        <>
          <button onClick={()=>setDrawerOpen(true)} className="px-4 py-2 bg-purple-600 rounded text-white">Create Ticket</button>
        </>
      </div>

      {/* Alarm summary - we will fake summary from site slice (mock provides alarmSummary) */}
      <div className="mt-4">
        {/* We will reuse the handler to fetch alarms summary from site slice; but in mock we returned it in fetchSite payload */}
        <AlarmSummary stats={alarmSummary || {down:0, critical:0, major:0, minor:0}} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Energy Report 1.0</h3>
        <div className="mt-2 bg-gray-800 p-4 rounded">
          <EnergyChart dates={energyStats.dates || []} solar={energyStats.solar || []} grid={energyStats.grid || []} />
        </div>
      </div>

      <TicketDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} siteId={id} />
    </div>
  );
}
