import { ImageResponse } from "next/og";

export const alt = "Mohamed Assem Ahmed — Visual Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
          background: "linear-gradient(120deg, #071923 0%, #0d2732 58%, #06131d 100%)",
          color: "#eef4f2",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -80, top: -180, width: 660, height: 660, borderRadius: "50%", border: "1px solid rgba(112, 213, 211, .24)", display: "flex" }} />
        <div style={{ position: "absolute", right: 5, top: -80, width: 490, height: 490, borderRadius: "50%", border: "1px solid rgba(112, 213, 211, .14)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 18, letterSpacing: "0.22em", color: "#79d5d1" }}>
          <div style={{ width: 42, height: 2, background: "#79d5d1", display: "flex" }} />
          INDEPENDENT VISUAL PRACTICE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02 }}>MOHAMED ASSEM</div>
          <div style={{ fontSize: 34, letterSpacing: "0.24em", color: "#79d5d1" }}>VISUAL DIRECTOR</div>
          <div style={{ marginTop: 18, fontSize: 22, lineHeight: 1.45, color: "#b6c7c8" }}>Direction · Cinematography · Editing · Visual Identity</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(238,244,242,.2)", paddingTop: 22, fontSize: 15, letterSpacing: "0.12em", color: "#9db3b7" }}>
          <span>CAIRO, EGYPT</span>
          <span>IDEA → DIRECTION → FRAME</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
