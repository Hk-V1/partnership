const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function matchProjects(data) {
  const res = await fetch(`${BASE_URL}/match-projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function negotiate(data) {
  const res = await fetch(`${BASE_URL}/negotiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function composeMessage(data) {
  const res = await fetch(`${BASE_URL}/compose-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function generateDocument(data) {
  const res = await fetch(`${BASE_URL}/generate-document`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
