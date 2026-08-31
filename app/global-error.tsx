"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>This page couldn&apos;t load</h2>
        <p style={{ margin: 0, maxWidth: 420, color: "#666", fontSize: 14 }}>
          {error.message || "A server error occurred. Reload to try again."}
        </p>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            height: 32,
            padding: "0 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
