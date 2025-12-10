import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-800 p-4 flex gap-4 items-center justify-between">
        <h1 className="text-xl font-bold text-gray-300">Energy Dashboard</h1>
        <Navbar />
      </header>
      <AllRoutes />
    </div>
  );
}
