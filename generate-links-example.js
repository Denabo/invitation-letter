/**
 * Example script to generate personalized invitation links for the single static site.
 *
 * Usage:
 *   bun run generate-links
 */

function base64Encode(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

function generateInvitationLink(guestName, baseUrl = "http://localhost:5173") {
  const encodedName = base64Encode(guestName);
  return `${baseUrl}/?guest=${encodedName}`;
}

const BASE_URL = "http://localhost:5173";
const guestList = [
  "Ahmad Abdullah",
  "Sarah Johnson",
  "Bapak Rudi & Keluarga",
  "Ibu Siti & Keluarga",
  "Dr. Bambang",
  "Keluarga Besar Hartono",
];

console.log(
  "\n╔══════════════════════════════════════════════════════════════╗",
);
console.log("║          PERSONALIZED WEDDING INVITATION LINKS               ║");
console.log(
  "╚══════════════════════════════════════════════════════════════╝\n",
);
console.log(`Base URL: ${BASE_URL}\n`);
console.log("─".repeat(70) + "\n");

guestList.forEach((guestName, index) => {
  const link = generateInvitationLink(guestName, BASE_URL);
  console.log(`${index + 1}. ${guestName}`);
  console.log(`   ${link}\n`);
});

console.log("─".repeat(70));
console.log(`\nTotal guests: ${guestList.length}`);
console.log("\nHow to use:");
console.log("1. Share each personalized link with the corresponding guest");
console.log("2. When they open the link, their name will be pre-filled");
console.log("3. They can still edit their name if needed\n");
