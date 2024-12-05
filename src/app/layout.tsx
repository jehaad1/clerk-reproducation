import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
