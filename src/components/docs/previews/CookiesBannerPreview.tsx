"use client";

import { CookiesBanner } from "../../../../lib/components/compounds/cookies-banner";

export function CookiesBannerPreview() {
  return (
    <div className="rounded-lg border border-dashed p-6">
      <CookiesBanner
        className="static rounded-lg border shadow-none"
        onReject={() => {
          console.log("Reject clicked");
        }}
        onFunctional={() => {
          console.log("Only Functional clicked");
        }}
        onAccept={() => {
          console.log("Accept All clicked");
        }}
      />
    </div>
  );
}

export default CookiesBannerPreview;
