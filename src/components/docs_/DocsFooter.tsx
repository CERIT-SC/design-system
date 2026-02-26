import { Small } from "../../../lib/components/typography/typography";

export function DocsFooter() {
  return (
    <footer className="mt-16 pt-8 border-t">
      <Small className="text-center">{`e-INFRA CZ Design System • Documentation generated on ${new Date().toLocaleDateString()}`}</Small>
    </footer>
  );
}
