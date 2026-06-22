const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const body = await response.text();
  const message = body.startsWith("The page c")
    ? "API endpoint was not found. Check Vercel routing for /api/rsvp."
    : "Server returned a non-JSON response.";

  return {
    success: false,
    error: message,
    code: "NON_JSON_RESPONSE",
  };
}

export async function createRsvp(rsvpData) {
  const response = await fetch(`${API_URL}/api/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rsvpData),
  });

  const data = await parseJsonResponse(response);

  if (!response.ok) {
    const error = new Error(data.error || "Failed to submit RSVP");
    error.code = data.code;
    throw error;
  }

  return data;
}
