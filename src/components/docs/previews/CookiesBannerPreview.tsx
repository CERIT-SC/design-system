"use client";

import { CookiesBanner } from "../../../../lib/components/compounds/cookies-banner";

export function CookiesBannerPreview() {
  return (
    <div className="rounded-lg border border-dashed p-6">
      {/* Handlers are intentionally no-ops: this is a static docs preview. */}
      <CookiesBanner
        className="static rounded-lg border shadow-none"
        onReject={() => undefined}
        onFunctional={() => undefined}
        onAccept={() => undefined}
      />
    </div>
  );
}

export default CookiesBannerPreview;
