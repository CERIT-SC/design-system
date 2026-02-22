"use client";

import * as React from "react";
import { DocsHeader } from "../../components/docs_/DocsHeader";
import { DocsSection } from "../../components/docs_/DocsSection";
import { DocsFooter } from "../../components/docs_/DocsFooter";
import { ButtonDoc } from "../../components/docs_/components/primitives/ButtonDoc";
import { BreadcrumbDoc } from "../../components/docs_/components/primitives/BreadcrumbDoc";
import { CheckboxDoc } from "../../components/docs_/components/primitives/CheckboxDoc";
import { FeedbackFormDoc } from "../../components/docs_/components/composed/FeedbackFormDoc";

export default function TestPage() {
  const navigationLinks = [
    { id: "button", label: "Button", category: "Primitives" },
    { id: "breadcrumb", label: "Breadcrumb", category: "Primitives" },
    { id: "checkbox", label: "Checkbox", category: "Primitives" },
    { id: "feedbackform", label: "FeedbackForm", category: "Composed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <DocsHeader navigationLinks={navigationLinks} />

        <DocsSection category="Primitives">
          <ButtonDoc />
          <BreadcrumbDoc />
          <CheckboxDoc />
        </DocsSection>

        <DocsSection category="Composed">
          <FeedbackFormDoc />
        </DocsSection>

        <DocsFooter />
      </div>
    </div>
  );
}
