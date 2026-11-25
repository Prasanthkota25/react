
// Example: src/pages/ApplyLeave.jsx
import { useState } from "react";
import { applyLeave } from "../api/leaveApi";
import { useAuth } from "../context/AuthContext";

const ApplyLeave = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    leaveType: "", fromDate: "", toDate: "", reason: "", approver: "", contactAddress: "", contactNumber: "", ccTo: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await applyLeave(form, user.token);
    alert("Leave Applied!");
  };

  return (
    <div className="page-container">
      <h2>Apply Leave</h2>
      {/* form fields here */}
      <button onClick={handleSubmit}>Submit</button>

      {/* Leave History Table below the form */}
      <h3>Leave History</h3>
      <table>{/* table rows here */}</table>
    </div>
  );
};

export default ApplyLeave;