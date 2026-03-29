"use client";

import { Button } from "@weavekit/ui";

export default function TestPage() {
  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>@weavekit/ui 테스트</h1>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button variant="filled" type="primary" onClick={() => alert("clicked!")}>
          Primary Filled
        </Button>
        <Button variant="outline" type="primary">
          Primary Outline
        </Button>
        <Button variant="filled" type="secondary">
          Secondary
        </Button>
        <Button variant="filled" type="destructive">
          Destructive
        </Button>
        <Button variant="filled" type="primary" loading>
          Loading
        </Button>
        <Button variant="filled" type="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
