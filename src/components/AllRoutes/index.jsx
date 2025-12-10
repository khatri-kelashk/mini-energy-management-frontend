import { Routes, Route } from "react-router-dom";
import LivePowerPage from "../../pages/LivePowerPage";
import AlarmsPage from "../../pages/AlarmsPage";
import SiteDetailsPage from "../../pages/SiteDetailsPage";

export default function AllRoutes() {
  return (
    <main className="p-6">
      <Routes>
        <Route path="/" element={<LivePowerPage />} />
        <Route path="/alarms" element={<AlarmsPage />} />
        <Route path="/site/:id" element={<SiteDetailsPage />} />
      </Routes>
    </main>
  );
}
