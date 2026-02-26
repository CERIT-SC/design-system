"use client";

import { CookiesBanner } from "../../lib/components/mid-level/CookiesBanner";
import ComponentShowcase from "../components/ComponentShowcase";

export default function HomePage() {
  return (
    <>
      <ComponentShowcase />

      <CookiesBanner />
    </>
  );
}
