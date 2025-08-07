import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

export default function CommunicationForm() {
  const [context, setContext] = useState("");
  const [formality, setFormality] = useState("formal");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompose = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setTone(null);

    if (!context.trim()) {
      setError("Please enter context");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${BACKEND_URL}/compose-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ negotiation_id: 1, context, formality }),
      });
      if (!resp.ok) throw new Error("API error");
      const data = await resp.json();
      setMessage(data.message);
      setTone(data.tone);
    } catch (err) {
      setError("Failed to compose message");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleCompose} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Compose Message</h2>
      <label>Context:</label>
      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Enter message context or topic"
        style={{ width: "100%", height: 80 }}
      />
      <label>Formality:</label>
      <select value={formality} onChange={(e) => setFormality(e.target.value)} style={{ width: "100%", padding: 6 }}>
        <option value="formal">Formal</option>
        <option value="informal">Informal</option>
      </select>
      <button type="submit" disabled={loading} style={{ marginTop: 10, padding: "8px 16px" }}>
        {loading ? "Composing..." : "Compose"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && (
        <div style={{ marginTop: 20 }}>
          <h3>Message</h3>
          <pre style={{ background: "#eee", padding: 10 }}>{message}</pre>
          <h4>Tone Analysis</h4>
          <pre>{JSON.stringify(tone, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
