import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/data/business";

// Runs as a Node.js function (not edge) so it can read the logo straight
// off disk with `fs` — simplest way to composite a local PNG into an
// og:image without re-hosting it anywhere.
export const runtime = "nodejs";

export const alt = `${business.name} — ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #ffffff 45%, #fbeaea 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={200} height={200} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 68,
            fontWeight: 800,
            color: "#1c1917",
            letterSpacing: "-0.02em",
          }}
        >
          {business.name}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 34,
            fontWeight: 600,
            color: "#a81111",
          }}
        >
          {business.tagline}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            fontWeight: 500,
            color: "#6b6260",
          }}
        >
          {`${business.primaryCity}, ${business.state} & ${business.serviceRegion}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
