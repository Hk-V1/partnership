import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

export default function DocumentGenerator() {
  const [docType, setDocType] = useState("mou");
  const [parties, setParties] = useState("");
  const [project, setProject] = useState("");
  const [terms, setTerms] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setGeneratedDoc("");
    setLoading(true);

    const payload = { doc_type: docType };

    if (docType === "mou") {
      payload.parties = parties;
      payload.project = project;
      payload.terms = terms;
    } else if (docType === "letter") {
      payload.recipient = recipient;
      payload.subject = subject;
      payload.content = content;
    }

    try {
      const resp = await fetch(`${BACKEND_URL}/generate-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("API Error");
      const data = await resp.json();
      setGeneratedDoc(data.document);
    } catch (err) {
      setError("Failed to generate document");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleGenerate} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Generate Document</h2>

      <label>Document Type:</label>
      <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ width: "100%", padding: 6 }}>
        <option value="mou">Memorandum of Understanding (MoU)</option>
        <option value="letter">Letter</option>
      </select>

      {docType === "mou" && (
        <>
          <label>Parties (names):</label>
          <input value={parties} onChange={(e) => setParties(e.target.value)} style={{ width: "100%", padding: 6 }} />
          <label>Project Name:</label>
          <input value={project} onChange={(e) => setProject(e.target.value)} style={{ width: "100%", padding: 6 }} />
          <label>Terms:</label>
          <textarea value={terms} onChange={(e) => setTerms(e.target.value)} style={{ width: "100%", height: 80 }} />
        </>
      )}

      {docType === "letter" && (
        <>
          <label>Recipient:</label>
          <input value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: "100%", padding: 6 }} />
          <label>Subject:</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: "100%", padding: 6 }} />
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ width: "100%", height: 80 }} />
        </>
      )}

      <button type="submit" disabled={loading} style={{ marginTop: 10, padding: "8px 16px" }}>
        {loading ? "Generating..." : "Generate Document"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {generatedDoc && (
        <div style={{ marginTop: 20, background: "#eee", padding: 10, whiteSpace: "pre-wrap" }}>
          <h3>Generated Document</h3>
          {generatedDoc}
        </div>
      )}
    </form>
  );
}
