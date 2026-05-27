import FoundationsOverviewGrid from "../../../components/docs/FoundationsOverviewGrid";
import { buildDocsNavStructure } from "../../../lib/docs-nav";

export default function FoundationsPage() {
  const foundationsSection = buildDocsNavStructure().find(
    (section) => section.slug === "foundations"
  );

  return <FoundationsOverviewGrid items={foundationsSection?.items ?? []} />;
}
