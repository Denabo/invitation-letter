const RSVP_API_URL = import.meta.env.VITE_RSVP_API_URL || "/api/rsvp.php";

export const api = {
  async createRsvp(rsvpData) {
    const response = await fetch(RSVP_API_URL, {
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
