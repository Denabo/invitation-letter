const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  async createRsvp(rsvpData) {
    const response = await fetch(`${API_BASE}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rsvpData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.error || "Failed to submit RSVP");
      error.code = data.code;
      throw error;
    }

    return data;
  },
};
