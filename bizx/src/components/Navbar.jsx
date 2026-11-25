import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="brand">BizX</div>

      {/* Right: Search + Theme + Account */}
      <div className="nav-right">
        <input placeholder="Search Employee Profile" />

        {/* Theme dropdown */}
        <div className="dropdown">
          <button onClick={() => setThemeOpen(!themeOpen)}>🎨</button>
          {themeOpen && (
            <ul>
              <li>Light</li>
              <li>Dark</li>
              <li>Blue</li>
            </ul>
          )}
        </div>

        {/* Account dropdown */}
        <div className="dropdown">
          <button onClick={() => setAccountOpen(!accountOpen)}>
            {user?.username} ▼
          </button>
          {accountOpen && (
            <ul>
              <li onClick={() => navigate("/profile")}>Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;