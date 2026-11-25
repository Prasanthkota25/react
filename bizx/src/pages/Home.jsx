// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leavePanel, setLeavePanel] = useState(false);

  return (
    <div className="home-grid">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="hr-box">
          <p>HR Partner Name</p>
          <strong>Shiva Sharma (1029189)</strong>
        </div>
        <div className="links-box">
          <h4>Popular Links</h4>
          <ul>
            <li>Core HR</li>
            <li>Rootz</li>
            <li>Holiday Lists</li>
            <li>Employee Referral Portal</li>
          </ul>
        </div>
      </div>

      {/* CENTER PANEL */}
      <div className="center-panel">
        <button className="leave-btn" onClick={() => setLeavePanel(!leavePanel)}>
          Leave
        </button>
      </div>

      {/* RIGHT PANEL — appears when Leave clicked */}
      {leavePanel && (
        <div className="right-panel">
          <h4>Leave</h4>
          <ul>
            <li onClick={() => navigate("/apply-leave")}>Apply For Leave</li>
            <li onClick={() => navigate("/leave-balance")}>Leave Balance Summary</li>
            <li onClick={() => navigate("/my-team-leave")}>My Team Leave</li>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Home;