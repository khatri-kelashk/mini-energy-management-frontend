import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex gap-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "underline text-gray-300" : "text-gray-300"
        }
      >
        Live
      </NavLink>
      <NavLink
        to="/alarms"
        className={({ isActive }) =>
          isActive ? "underline text-gray-300" : "text-gray-300"
        }
      >
        Alarms
      </NavLink>
      <NavLink
        to="/site/1"
        className={({ isActive }) =>
          isActive ? "underline text-gray-300" : "text-gray-300"
        }
      >
        Site
      </NavLink>
    </nav>
  );
}
