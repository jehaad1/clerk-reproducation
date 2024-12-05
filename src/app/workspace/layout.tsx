"use client";

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  if (typeof window === "undefined") return <></>;
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      <html lang="en">
        <head>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <title>{user?.firstName}</title>
          </head>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
