import { ImageResponse } from "next/og";

export const alt = "Regulatory Execution Hub — From regulation to execution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0d2c2e",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "36px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "54px 60px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "22px" }}>
          <div
            style={{
              alignItems: "center",
              background: "#1c7476",
              borderRadius: "18px",
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              height: "72px",
              justifyContent: "center",
              width: "72px",
            }}
          >
            RE
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 700 }}>Regulatory Execution Hub</span>
            <span
              style={{
                color: "#9bc7ba",
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                marginTop: "7px",
                textTransform: "uppercase",
              }}
            >
              From regulation to execution
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "930px" }}>
          <span style={{ color: "#a8cec1", fontSize: "20px", fontWeight: 700 }}>
            OFFICIAL-SOURCE-FIRST EDUCATIONAL DECISION SUPPORT
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "66px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginTop: "18px",
            }}
          >
            Ask what you need to prepare.
          </span>
        </div>
        <div style={{ color: "#cfddda", display: "flex", fontSize: "20px", gap: "30px" }}>
          <span>Application preparation</span>
          <span>•</span>
          <span>Lifecycle changes</span>
          <span>•</span>
          <span>CTD evidence</span>
          <span>•</span>
          <span>Regulatory updates</span>
        </div>
      </div>
    </div>,
    size,
  );
}
