import Link from "next/link";
import { Content } from "../../../lib/components/layout/content";
import { buildDocsNavStructure } from "../../lib/docs-nav";

export default function DocsIndexPage() {
  // Auto-generated from the /docs directory — no manual updates needed.
  const sections = buildDocsNavStructure();

  return (
    <Content>
      <Content.Heading>Documentation</Content.Heading>
      <Content.Body>
        {sections.map((section) => (
          <div key={section.slug} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-blue-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Content.Body>
    </Content>
  );
}
