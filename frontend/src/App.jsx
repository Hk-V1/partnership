import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

export default function App() {
  const [userSkills, setUserSkills] = useState("");
  const [projectsText, setProjectsText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const parseProjects = () => {
    try {
      const parsed = JSON.parse(projectsText);
      if (!Array.isArray(parsed)) throw new Error("Projects JSON must be an array");
      return parsed;
    } catch (e) {
      setError("Invalid Projects JSON: " + e.message);
      return null;
    }
  };

  const handleMatch = async () => {
    setError("");
    setMatches([]);
    setSelectedProject(null);

    const skillsArr = userSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (skillsArr.length === 0) {
      setError("Please enter at least one user skill.");
      return;
    }

    const projects = parseProjects();
    if (!projects) return;

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/match-projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          user_skills: skillsArr,
          projects: projects,
        }),
      });
      if (!res.ok) throw new Error(`API error: ${res.statusText}`);
      const data = await res.json();
      setMatches(data);
    } catch (e) {
      setError("Network or server error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1>Partnership Platform — Match Projects</h1>

      <label>
        User Skills (comma separated):
        <input
          type="text"
          placeholder="e.g. python, machine learning, project management"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </label>

      <label>
        Projects JSON (array of objects with id, name, skills):
        <textarea
          placeholder='e.g. [{"id": 1, "name": "AI Project", "skills": ["python","ml"]}]'
          value={projectsText}
          onChange={(e) => setProjectsText(e.target.value)}
          style={{ width: "100%", height: 100, padding: 8, margin: "8px 0" }}
        />
      </label>

      <button
        onClick={handleMatch}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Matching..." : "Find Matches"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>
          <b>Error:</b> {error}
        </p>
      )}

      {matches.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Matched Projects</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {matches.map(({ project, similarity }) => (
              <li
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  marginBottom: 10,
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  cursor: "pointer",
                  backgroundColor:
                    selectedProject && selectedProject.id === project.id ? "#e0f7fa" : "white",
                }}
              >
                <strong>{project.name}</strong> — Similarity: {(similarity * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedProject && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #00796b",
            borderRadius: 6,
            backgroundColor: "#e0f2f1",
          }}
        >
          <h3>Project Details</h3>
          <p>
            <strong>Name:</strong> {selectedProject.name}
          </p>
          <p>
            <strong>Required Skills:</strong> {selectedProject.skills.join(", ")}
          </p>
          {/* Extend here to show more details or actions */}
          <button onClick={() => setSelectedProject(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}
