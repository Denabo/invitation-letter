import { safeBase64 } from "@/lib/base64";

/**
 * Generate a personalized invitation link for the single static invitation.
 * @param {string} guestName - The guest's name.
 * @param {string} baseUrl - Optional base URL.
 * @returns {string} The personalized invitation URL.
 */
export function generateInvitationLink(guestName, baseUrl) {
  const url =
    baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const encodedName = safeBase64.encode(guestName);
  return `${url}/?guest=${encodedName}`;
}

/**
 * Generate multiple invitation links for a list of guests.
 * @param {string[]} guestNames - Array of guest names.
 * @param {string} baseUrl - Optional base URL.
 * @returns {Array<{name: string, link: string}>} Array of objects with name and link.
 */
export function generateBulkInvitationLinks(guestNames, baseUrl) {
  return guestNames.map((name) => ({
    name,
    link: generateInvitationLink(name, baseUrl),
  }));
}

export function printInvitationLinks(
  guestNames,
  baseUrl = "http://localhost:5173",
) {
  const links = generateBulkInvitationLinks(guestNames, baseUrl);
  console.log("\n=== Personalized Invitation Links ===\n");
  links.forEach(({ name, link }) => {
    console.log(`${name}:\n${link}\n`);
  });
  return links;
}
