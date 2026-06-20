/**
 * Copyright (c) 2024-present mrofisr
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import { safeBase64 } from "./lib/base64";
import { storeGuestName } from "./lib/invitation-storage";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}

if (typeof window !== "undefined") {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("guest");

  if (guestParam) {
    try {
      const decodedName = safeBase64.decode(guestParam);
      if (decodedName) {
        storeGuestName(decodedName);
        window.history.replaceState({}, "", window.location.pathname || "/");
      }
    } catch (error) {
      console.error("Error decoding guest name:", error);
    }
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
