import type { ReactNode } from "react";

import { buildDocsNavStructure } from "../../lib/docs-nav";
import { DocLayout } from "../../components/docs/DocLayout";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const navStructure = buildDocsNavStructure();
  return <DocLayout navStructure={navStructure}>{children}</DocLayout>;
}
