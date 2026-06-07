import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Zap, Database, FileText, Download, Search } from "lucide-react";

/* ─── breakpoint hook ─────────────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, w };
}

const AboutPage = ({ navigate }) => {
  const [downloading, setDownloading]   = useState(false);
  const [activeSlide, setActiveSlide]   = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const trackRef                        = useRef(null);
  const intervalRef                     = useRef(null);
  const { isMobile, isTablet }          = useBreakpoint();

  const sidePad = isMobile ? "20px" : isTablet ? "28px" : "40px";

  const screenshots = [
    { id: 1, title: "Dashboard Overview",    desc: "All open databases and session stats at a glance",                                       color: "#1a0f00" },
    { id: 2, title: "Database Explorer",     desc: "Browse tables, views, indexes, and triggers in a tree view",                             color: "#0a1a0a" },
    { id: 3, title: "SQL Query Console",     desc: "Write and run queries with syntax highlighting",                                          color: "#0a0a1a" },
    { id: 4, title: "AI Query Assistant",    desc: "Generate, explain, and optimize SQL with built-in AI",                                   color: "#0a1a15" },
    { id: 5, title: "Chat History",          desc: "View, search, and manage previous AI conversations and generated SQL queries",            color: "#0a1a15" },
    { id: 6, title: "ER Diagram Generator",  desc: "Auto-generated entity-relationship diagrams from schema",                                color: "#1a0a10" },
    { id: 7, title: "ER Diagram Preview",    desc: "Preview generated ER diagrams and view exported PNG schema visualizations",              color: "#0a1a15" },
    { id: 8, title: "Export & Reports",      desc: "Export results to CSV, JSON, or PNG with one click",                                     color: "#1a1000" },
  ];

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/downloads/agaradhi.exe";
    link.download = "Agaradhi SQLite Manager.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  const goToSlide = (i) => setActiveSlide(i);
  const nextSlide = () => setActiveSlide((p) => (p + 1) % screenshots.length);
  const prevSlide = () => setActiveSlide((p) => (p - 1 + screenshots.length) % screenshots.length);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveSlide((p) => (p + 1) % screenshots.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, screenshots.length]);

  /* auto-scroll thumbnail strip to keep active thumb visible */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const thumb = track.children[activeSlide];
    if (!thumb) return;
    thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeSlide]);

  const coreValues = [
    { icon: <ShieldCheck size={20} color="#fbbf24" />, title: "100% Offline & Private",  desc: "All data stays on your machine. No cloud sync, no telemetry, no hidden fees."                              },
    { icon: <Zap         size={20} color="#fbbf24" />, title: "Instant Query Execution",  desc: "Run SQL queries and see results immediately. Supports complex joins, CTEs, and aggregations."             },
    { icon: <Database    size={20} color="#fbbf24" />, title: "Full Schema Inspection",   desc: "View tables, indexes, foreign keys, and triggers. Generate ER diagrams automatically."                    },
    { icon: <Search      size={20} color="#fbbf24" />, title: "AI Query Assistant",       desc: "Generate queries from plain English, explain schemas, and get optimization suggestions."                   },
  ];

  return (
    <div style={{
      width: "100%", minHeight: "100vh", backgroundColor: "#000",
      color: "#fff", fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box", overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: isMobile ? "60px 20px 48px" : isTablet ? "80px 28px 56px" : "100px 40px 60px",
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", position: "relative",
      }}>
        {/* glow */}
        <div style={{
          position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
          width: isMobile ? "280px" : "500px", height: isMobile ? "140px" : "250px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1c1000", border: "1px solid #92400e",
          borderRadius: 20, padding: "6px 16px",
          fontSize: 12, color: "#fbbf24", fontWeight: 600, marginBottom: 24,
        }}>
          🗄 About The Project
        </div>

        <h1 style={{
          fontSize: isMobile ? "clamp(28px,8vw,38px)" : "clamp(32px,5vw,64px)",
          fontWeight: 900, lineHeight: 1.1,
          margin: "0 0 20px", letterSpacing: "-1px", maxWidth: 800,
        }}>
          Built for{" "}
          <span style={{
            background: "linear-gradient(90deg,#fbbf24,#f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            SQLite Developers
          </span>
        </h1>

        <p style={{
          fontSize: isMobile ? 14 : "clamp(15px,1.5vw,18px)",
          color: "#9ca3af", lineHeight: 1.8,
          margin: "0 0 32px", maxWidth: 600,
        }}>
          Agaradhi is a lightweight, offline-first desktop application designed to streamline
          database exploration, SQL querying, schema visualization, and AI-assisted query
          generation — without any cloud dependency or subscription.
        </p>

        {/* inline stats */}
        <div style={{
          display: "flex", gap: isMobile ? 20 : 32,
          flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { val: "8+",   lbl: "Modules"  },
            { val: "100%", lbl: "Offline"  },
            { val: "AI",   lbl: "Powered"  },
            { val: "Free", lbl: "Forever"  },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: "#fbbf24", margin: 0 }}>{s.val}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{s.lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: `0 ${sidePad} ${isMobile ? 52 : 80}px`,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
        gap: 16, maxWidth: 1200, margin: "0 auto",
      }}>
        {coreValues.map((item, i) => (
          <CoreCard key={i} item={item} />
        ))}
      </section>

      {/* ── SCREENSHOT SLIDER ── */}
      <section style={{ width: "100%", boxSizing: "border-box", padding: `0 0 ${isMobile ? 64 : 100}px`, overflow: "hidden" }}>
        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48, padding: `0 ${sidePad}` }}>
          <p style={{
            fontSize: 12, color: "#fbbf24", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px",
          }}>
            Interface Preview
          </p>
          <h2 style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 800, margin: "0 0 12px" }}>
            See Agaradhi in Action
          </h2>
          <p style={{ fontSize: 14, color: "#9ca3af", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Clean, dark interface built for long working sessions. Navigate
            seamlessly between the explorer, query console, and AI assistant.
          </p>
        </div>

        {/* main slide */}
        <div
          style={{ padding: `0 ${sidePad}`, marginBottom: 20, position: "relative" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div style={{
            width: "100%",
            aspectRatio: isMobile ? "4/3" : "16/7",
            background: screenshots[activeSlide].color,
            border: "1px solid #2a1f00", borderRadius: isMobile ? 12 : 16,
            overflow: "hidden", position: "relative",
            transition: "background 0.4s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={`/screenshots/screenshot-${screenshots[activeSlide].id}.png`}
              alt={screenshots[activeSlide].title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />

            {/* gradient overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
              padding: isMobile ? "28px 16px 16px" : "40px 32px 24px",
            }}>
              <p style={{ fontSize: isMobile ? 14 : 18, fontWeight: 700, margin: "0 0 4px" }}>
                {screenshots[activeSlide].title}
              </p>
              <p style={{ fontSize: isMobile ? 12 : 13, color: "#9ca3af", margin: 0 }}>
                {screenshots[activeSlide].desc}
              </p>
            </div>

            {/* counter badge */}
            <div style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(0,0,0,0.6)", border: "1px solid #2a1f00",
              borderRadius: 20, padding: "4px 10px",
              fontSize: 12, color: "#fbbf24", fontWeight: 600,
            }}>
              {activeSlide + 1} / {screenshots.length}
            </div>

            {/* prev / next arrows */}
            <SliderArrow dir="left"  onClick={prevSlide} isMobile={isMobile} />
            <SliderArrow dir="right" onClick={nextSlide} isMobile={isMobile} />
          </div>
        </div>

        {/* dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {screenshots.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: i === activeSlide ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === activeSlide ? "#fbbf24" : "#2a1f00",
              border: "none", cursor: "pointer",
              transition: "width 0.3s, background 0.3s", padding: 0,
            }} />
          ))}
        </div>

        {/* thumbnail strip */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* fade edges */}
          {["left","right"].map(side => (
            <div key={side} style={{
              position: "absolute", [side]: 0, top: 0, bottom: 0,
              width: isMobile ? 40 : 80, zIndex: 2, pointerEvents: "none",
              background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #000, transparent)`,
            }} />
          ))}

          <div ref={trackRef} style={{
            display: "flex", gap: isMobile ? 8 : 12,
            padding: `4px ${sidePad}`,
            overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            {screenshots.map((ss, i) => (
              <ThumbCard
                key={ss.id}
                ss={ss}
                index={i}
                active={i === activeSlide}
                isMobile={isMobile}
                onClick={() => {
                  goToSlide(i);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: `0 ${sidePad} ${isMobile ? 52 : 80}px`,
        textAlign: "center",
      }}>
        <div style={{
          background: "linear-gradient(135deg,#1c1000 0%,#0d0800 50%,#000 100%)",
          border: "1px solid #92400e", borderRadius: isMobile ? 14 : 20,
          padding: isMobile ? "36px 20px" : "48px 32px",
          maxWidth: 800, margin: "0 auto",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -40, top: -40,
            width: 150, height: 150, borderRadius: "50%",
            border: "1px solid #92400e", opacity: 0.3, pointerEvents: "none",
          }} />
          <h2 style={{ fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, margin: "0 0 12px" }}>
            Ready to Explore Your Databases Better?
          </h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "0 0 24px" }}>
            Join developers who've switched to a faster, offline-first SQLite manager.
          </p>
          <div style={{
            display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row", alignItems: "center",
          }}>
            <button
              onClick={() => navigate("home")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg,#fbbf24,#b45309)",
                color: "#000", border: "none",
                padding: isMobile ? "13px 24px" : "14px 28px",
                borderRadius: 10, fontSize: 14, fontWeight: 700,
                cursor: "pointer", width: isMobile ? "100%" : "auto",
                justifyContent: "center",
              }}
            >
              ← Back to Download
            </button>
            <button
              onClick={handleDownload}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "#fbbf24",
                border: "1px solid #92400e",
                padding: isMobile ? "13px 24px" : "14px 28px",
                borderRadius: 10, fontSize: 14, fontWeight: 700,
                cursor: "pointer", width: isMobile ? "100%" : "auto",
                justifyContent: "center",
              }}
            >
              <Download size={16} />
              {downloading ? "Downloading..." : "Download Now"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        width: "100%", boxSizing: "border-box",
        borderTop: "1px solid #2a1f00",
        padding: isMobile ? "20px" : "24px 40px",
        display: "flex", alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        flexWrap: "wrap", gap: 12,
        fontSize: 12, color: "#6b7280",
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: "linear-gradient(135deg,#fbbf24,#b45309)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
          }}>🗄</div>
          <span style={{ fontWeight: 600, color: "#9ca3af" }}>
            Agaradhi <span style={{ color: "#fbbf24" }}>SQLite</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck size={13} color="#fbbf24" /> Secure • Offline • AI Powered
        </div>
      </footer>
    </div>
  );
};

/* ─── sub-components ─────────────────────────────────────── */

function CoreCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#080500", border: `1px solid ${hov ? "#92400e" : "#2a1f00"}`,
        borderRadius: 12, padding: 24,
        transform: hov ? "translateY(-2px)" : "none",
        transition: "transform 0.2s, border-color 0.2s", cursor: "default",
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: "#1c1000", display: "flex",
        alignItems: "center", justifyContent: "center", marginBottom: 16,
      }}>
        {item.icon}
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{item.title}</p>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
    </div>
  );
}

function SliderArrow({ dir, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  const size = isMobile ? 32 : 40;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", [dir]: isMobile ? 8 : 16, top: "50%",
        transform: "translateY(-50%)",
        background: hov ? "#1c1000" : "rgba(0,0,0,0.7)",
        border: "1px solid #2a1f00", color: "#fbbf24",
        borderRadius: "50%", width: size, height: size,
        fontSize: isMobile ? 16 : 18, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

function ThumbCard({ ss, index, active, isMobile, onClick }) {
  const [hov, setHov] = useState(false);
  const thumbW = isMobile ? 130 : 180;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0, width: thumbW, borderRadius: 10, overflow: "hidden",
        border: active ? "2px solid #fbbf24" : `1px solid ${hov ? "#92400e" : "#2a1f00"}`,
        cursor: "pointer",
        transform: active ? "scale(1.04)" : "scale(1)",
        transition: "border-color 0.2s, transform 0.2s",
        background: ss.color,
      }}
    >
      <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={`/screenshots/screenshot-${ss.id}.png`}
          alt={ss.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      <div style={{ padding: isMobile ? "8px 10px" : "10px 12px" }}>
        <p style={{
          fontSize: isMobile ? 11 : 12, fontWeight: 700,
          margin: "0 0 2px",
          color: active ? "#fbbf24" : "#fff",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{ss.title}</p>
        <p style={{
          fontSize: 11, color: "#6b7280", margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{ss.desc}</p>
      </div>
    </div>
  );
}

export default AboutPage;