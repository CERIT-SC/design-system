import type { ReactNode } from "react";

import { buildDocsNavStructure } from "../../lib/docs-nav";
import { DocLayout } from "../../components/docs/DocLayout";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  // Reads the /docs directory on the server and builds the sidebar nav.
  // Adding a new .mdx file under /docs will automatically appear in the sidebar.
  const navStructure = buildDocsNavStructure();
  return <DocLayout navStructure={navStructure}>{children}</DocLayout>;
}
