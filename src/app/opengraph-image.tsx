import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#fff",
          background: "linear-gradient(135deg,#0b1030 0%,#2a1b6e 55%,#1d4ed8 100%)",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.8 }}>SyntexDev</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>WordPress &amp; WooCommerce,</div>
        <div style={{ fontSize: 76, fontWeight: 700 }}>built to convert.</div>
      </div>
    ),
    size,
  );
}
