const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível concluir a operação.");
  }

  return data;
}

export function getOpportunities(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "Todas" && value !== "Todos") {
      query.set(key, value);
    }
  });
  const suffix = query.toString() ? `?${query}` : "";
  return request(`/opportunities${suffix}`);
}

export function createOpportunity(payload) {
  return request("/opportunities", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateOpportunity(id, payload) {
  return request(`/opportunities/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function deleteOpportunity(id) {
  return request(`/opportunities/${id}`, {
    method: "DELETE"
  });
}
