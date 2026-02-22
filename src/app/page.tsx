"use client";

import { FeedbackForm } from "../../lib/components/mid-level/FeedbackForm";
import ComponentShowcase from "../components/ComponentShowcase";

export default function HomePage() {
  return (
    <>
      <ComponentShowcase />

      <FeedbackForm
        onSubmit={async (data) => {
          console.log("Feedback submitted:", data);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { success: true, message: "Thank you for your feedback!" };
        }}
      />
    </>
  );
}
