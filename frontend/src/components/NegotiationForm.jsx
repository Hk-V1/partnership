import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

export default function NegotiationForm() {
  const [expectedTerms, setExpectedTerms] = useState("");
  const [proposedTerms, setProposedTerms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    let expectedList, proposedList;
    try {
      expectedList = JSON.parse(expectedTerms);
      proposedList = JSON.parse(proposedTerms);
      if (!Array.isArray(expectedList) || !Array.isArray(proposedList)) {
        throw new Error("Both inputs must be JSON arrays.");
      }
    } catch (err) {
      setError("Invalid JSON input: " + err.message);
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${BACKEND_URL}/negotiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match_id: 1,  // Or dynamic id
          expected_terms: expectedList,
          proposed_terms: proposedList,
        }),
      });
      if (!resp.ok) throw new Error("API error");
      const data = await resp.json();
      setResult(data);
    } catch (e) {
      setError("API request failed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Negotiate Terms</h2>
      <label>Expected Terms (JSON array):</label>
      <textarea
        value={expectedTerms}
        onChange={(e) => setExpectedTerms(e.target.value)}
        placeholder='e.g. ["Price: $1000", "Delivery: 30 days"]'
        style={{ width: "100%", height: 80 }}
      />
      <label>Proposed Terms (JSON array):</label>
      <textarea
        value={proposedTerms}
        onChange={(e) => setProposedTerms(e.target.value)}
        placeholder='e.g. ["Price: $950", "Delivery: 40 days"]'
        style={{ width: "100%", height: 80 }}
      />
      <button type="submit" disabled={loading} style={{ marginTop: 10, padding: "8px 16px" }}>
        {loading ? "Evaluating..." : "Analyze & Counter"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <pre style={{ marginTop: 15, background: "#eee", padding: 10, maxHeight: 300, overflowY: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
