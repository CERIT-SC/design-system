import type { ReactNode } from 'react';

import { DocLayout } from '../../components/docs/DocLayout';

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <DocLayout>{children}</DocLayout>;
}
