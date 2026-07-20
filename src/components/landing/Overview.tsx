"use client";

import ComponentsOverview from "./ComponentsOverview";
import FoundationsOverview from "./FoundationsOverview";

export function Overview() {
  return (
    <section
      id="overview"
      className="flex flex-col gap-20 max-w-7xl mx-auto py-20 md:gap-32 md:py-32"
    >
      <FoundationsOverview />
      <ComponentsOverview></ComponentsOverview>
    </section>
  );
}
