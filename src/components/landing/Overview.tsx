"use client";

import ComponentsOverview from "./ComponentsOverview";
import FoundationsOverview from "./FoundationsOverview";

export function Overview() {
  return (
    <section
      id="overview"
      className="flex flex-col gap-32 max-w-7xl mx-auto py-32"
    >
      <FoundationsOverview />
      <ComponentsOverview></ComponentsOverview>
    </section>
  );
}
