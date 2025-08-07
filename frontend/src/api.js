const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function matchProjects(data) {
  const res = await fetch(`${BASE_URL}/match-projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed with status ${res.status}`);
  }

  return res.json();
}
