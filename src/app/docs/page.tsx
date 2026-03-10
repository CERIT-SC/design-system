import Link from "next/link";
import { Content } from "../../../lib/components/layout/content";

const docStructure = [
  {
    title: "Foundations",
    slug: "foundations",
    items: [
      { title: "Colors", path: "/docs/foundations/colors" },
      { title: "Typography", path: "/docs/foundations/typography" },
      { title: "Spacing", path: "/docs/foundations/spacing" },
      { title: "Grids", path: "/docs/foundations/grids" },
    ],
  },
  {
    title: "Primitives",
    slug: "primitives",
    items: [
      { title: "Button", path: "/docs/components/primitives/button" },
      { title: "Card", path: "/docs/components/primitives/card" },
      { title: "Checkbox", path: "/docs/components/primitives/checkbox" },
      { title: "Input", path: "/docs/components/primitives/input" },
      { title: "Label", path: "/docs/components/primitives/label" },
      { title: "Table", path: "/docs/components/primitives/table" },
    ],
  },
  {
    title: "Layout",
    slug: "layout",
    items: [
      { title: "Header", path: "/docs/components/layout/header" },
      { title: "Footer", path: "/docs/components/layout/footer" },
      { title: "Content", path: "/docs/components/layout/content" },
      { title: "Sidebar", path: "/docs/components/layout/sidebar" },
    ],
  },
];

export default function DocsIndexPage() {
  return (
    <Content>
      <Content.Heading>Documentation</Content.Heading>
      <Content.Body>
        {docStructure.map((section) => (
          <div key={section.slug} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-blue-600 hover:underline">
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
