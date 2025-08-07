import React, { useState } from "react";
import { matchProjects } from "../api";

export default function MatchProjectsForm() {
  const [userSkills, setUserSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let projectsJson;
    try {
      projectsJson = JSON.parse(projects);
      if (!Array.isArray(projectsJson)) throw new Error("Projects must be an array");
    } catch (err) {
      setError("Invalid JSON for projects");
      return;
    }

    const data = {
      user_id: 1,
      user_skills: userSkills.split(",").map((s) => s.trim()),
      projects: projectsJson,
    };

    try {
      const res = await matchProjects(data);
      setResult(res);
    } catch (err) {
      setError("API request failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Match Projects</h2>
      <label>
        User Skills (comma separated):<br />
        <input
          type="text"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
          placeholder="e.g. python, machine learning, project management"
          required
        />
      </label>
      <label>
        Projects (JSON Array):<br />
        <textarea
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          style={{ width: "100%", height: 100, marginBottom: 12 }}
          placeholder={`e.g. [{"id":1,"name":"AI platform","skills":["python","nlp"]}]`}
          required
        />
      </label>
      <button type="submit" style={{ padding: "8px 16px" }}>
        Match
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <pre
          style={{
            marginTop: 20,
            backgroundColor: "#eee",
            padding: 12,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
