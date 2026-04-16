import { buildDocsNavStructure } from "../../../lib/docs-nav";
import ComponentsOverviewGrid from "../../../components/docs/ComponentsOverviewGrid";

export default function ComponentsPage() {
  const sections = buildDocsNavStructure().filter((section) =>
    ["primitives", "compounds", "layout"].includes(section.slug)
  );

  return <ComponentsOverviewGrid sections={sections} />;
}
