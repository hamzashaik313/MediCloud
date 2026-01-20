import { useState } from "react";
import { apiFetch } from "../api/api.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    try {
      const res = await apiFetch("/auth/register-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      setMsg(await res.text());
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="card">
      <h2>Patient Registration</h2>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={submit}>Register</button>
      <p>{msg}</p>
      <a href="/login">Back to login</a>
    </div>
  );
}