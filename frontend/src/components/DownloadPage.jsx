import React, { useState, useEffect } from "react";
import {
  Download, ShieldCheck, MonitorSmartphone, Zap,
  CheckCircle2, Star, Database, Table, Search,
  BarChart3, FileText, Terminal,
} from "lucide-react";
import Navbar from "./Navbar";

/* ─── breakpoint hook ─────────────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

const DownloadPage = ({ navigate }) => {
  const [downloading, setDownloading] = useState(false);
  const { isMobile, isTablet, isDesktop, w } = useBreakpoint();

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/downloads/agaradhi.exe";
    link.download = "Vidhagam SQLite Manager.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  const features = [
    { icon: <Database  size={22} color="#fbbf24" />, title: "Database Explorer",     desc: "Browse, create, and manage multiple SQLite databases with a clean tree view"              },
    { icon: <Table     size={22} color="#fbbf24" />, title: "Table & Schema Viewer",  desc: "Inspect columns, data types, indexes, and foreign keys at a glance"                      },
    { icon: <Terminal  size={22} color="#fbbf24" />, title: "SQL Query Console",      desc: "Write and execute SQL queries with syntax highlighting and result grids"                  },
    { icon: <BarChart3 size={22} color="#fbbf24" />, title: "ER Diagram Generator",   desc: "Auto-generate entity-relationship diagrams from your database schema"                    },
    { icon: <FileText  size={22} color="#fbbf24" />, title: "Export & Reports",       desc: "Export query results and schema reports to CSV, JSON, or PNG"                            },
    { icon: <Search    size={22} color="#fbbf24" />, title: "AI-Powered Assistant",   desc: "Generate queries, explain schemas, and optimize SQL with built-in AI"                    },
  ];

  const highlights = [
    { value: "8+",  label: "Modules" },
    { value: "AI",  label: "Powered" },
    { value: "v1.0",label: "Release" },
    { value: "Fast",label: "Queries" },
  ];

  /* derived layout values */
  const sidePad   = isMobile ? "20px" : isTablet ? "28px" : "40px";
  const featureCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const statCols    = isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)";

  return (
    <div style={{
      width: "100%", minHeight: "100vh", backgroundColor: "#000",
      color: "#fff", fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box", overflowX: "hidden",
    }}>

      {/* ── HERO ── */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: isMobile ? "60px 20px 48px" : isTablet ? "72px 28px 56px" : "90px 40px 70px",
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", position: "relative",
      }}>
        {/* glow */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: isMobile ? "300px" : "600px", height: isMobile ? "160px" : "300px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1c1000", border: "1px solid #92400e",
          borderRadius: 20, padding: "6px 16px",
          fontSize: isMobile ? 11 : 12, color: "#fbbf24", fontWeight: 600, marginBottom: 24,
        }}>
          <Star size={13} fill="#fbbf24" color="#fbbf24" />
          {isMobile ? "AI-Powered SQLite Manager" : "AI-Powered SQLite Database Manager — Built for Developers"}
        </div>

        <h1 style={{
          fontSize: isMobile ? "clamp(30px,8vw,40px)" : "clamp(36px,5vw,72px)",
          fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px",
          letterSpacing: "-1px", maxWidth: 800,
        }}>
          Manage SQLite Databases{" "}
          <span style={{
            background: "linear-gradient(90deg,#fbbf24,#f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {isMobile ? "Smarter" : "Smarter & Faster"}
          </span>
        </h1>

        <p style={{
          fontSize: isMobile ? 14 : "clamp(15px,1.5vw,18px)",
          color: "#9ca3af", lineHeight: 1.8,
          margin: "0 0 36px", maxWidth: 560,
        }}>
          Complete database exploration, SQL querying, schema visualization, and
          AI assistance — all in one powerful desktop app designed for SQLite.
        </p>

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: isMobile ? 12 : 16,
          flexWrap: "wrap", justifyContent: "center", marginBottom: 48,
          flexDirection: isMobile ? "column" : "row",
        }}>
          <button
            onClick={handleDownload}
            style={{
              background: downloading ? "#b45309" : "linear-gradient(135deg,#fbbf24,#b45309)",
              color: "#000", border: "none",
              padding: isMobile ? "14px 28px" : "16px 36px",
              borderRadius: 14, fontSize: isMobile ? 15 : 16, fontWeight: 800,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 0 40px rgba(251,191,36,0.2)", transition: "all 0.2s",
              width: isMobile ? "100%" : "auto", justifyContent: "center",
            }}
          >
            <Download size={20} />
            {downloading ? "Starting Download..." : "Download for Windows"}
          </button>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Vidhagam SQLite Manager.exe</p>
            <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Windows 10 / 11 · 64-bit · Free</p>
          </div>
        </div>

        {/* trust badges */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: isMobile ? 14 : 24, flexWrap: "wrap", justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
        }}>
          {[
            { icon: <ShieldCheck      size={15} color="#fbbf24" />, text: "Safe & secure installer"        },
            { icon: <MonitorSmartphone size={15} color="#fbbf24" />, text: "Windows 64-bit supported"      },
            { icon: <Zap              size={15} color="#fbbf24" />, text: "Lightning-fast query execution" },
            { icon: <CheckCircle2     size={15} color="#fbbf24" />, text: "AI query generation"            },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#9ca3af" }}>
              {b.icon} {b.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        borderTop: "1px solid #2a1f00", borderBottom: "1px solid #2a1f00",
        background: "#080500",
        display: "grid", gridTemplateColumns: statCols,
      }}>
        {highlights.map((h, i) => (
          <div key={i} style={{
            padding: isMobile ? "20px 10px" : "28px 20px",
            textAlign: "center",
            borderRight: (isMobile ? i % 2 !== 1 : i < 3) ? "1px solid #2a1f00" : "none",
            borderBottom: isMobile && i < 2 ? "1px solid #2a1f00" : "none",
          }}>
            <p style={{ fontSize: isMobile ? 26 : 32, fontWeight: 900, color: "#fbbf24", margin: "0 0 4px" }}>{h.value}</p>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{h.label}</p>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section style={{ width: "100%", boxSizing: "border-box", padding: `${isMobile ? 52 : 80}px ${sidePad}` }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
          <p style={{
            fontSize: 12, color: "#fbbf24", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px",
          }}>
            Everything You Need
          </p>
          <h2 style={{ fontSize: "clamp(22px,3vw,42px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            Built for SQLite Developers
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Every feature is designed around how developers actually work with SQLite —
            from exploring schemas to writing complex queries with AI assistance.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: featureCols,
          gap: 2, background: "#2a1f00",
          border: "1px solid #2a1f00", borderRadius: 20, overflow: "hidden",
          width: "100%", boxSizing: "border-box",
        }}>
          {features.map((f, i) => (
            <FeatureCell key={i} f={f} />
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD CTA ── */}
      <section style={{ width: "100%", boxSizing: "border-box", padding: `0 ${sidePad} ${isMobile ? 52 : 80}px` }}>
        <div style={{
          width: "100%", boxSizing: "border-box",
          background: "linear-gradient(135deg,#1c1000 0%,#0d0800 50%,#000 100%)",
          border: "1px solid #92400e", borderRadius: isMobile ? 16 : 24,
          padding: isMobile ? "40px 24px" : isTablet ? "48px 36px" : "60px 48px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 36 : 40,
          position: "relative", overflow: "hidden",
        }}>
          {/* decorative rings */}
          {!isMobile && [
            { size: 280, offset: -60 }, { size: 180, offset: -20 },
          ].map((r, i) => (
            <div key={i} style={{
              position: "absolute", right: `${r.offset}px`, top: `${r.offset}px`,
              width: r.size, height: r.size, borderRadius: "50%",
              border: "1px solid #92400e", opacity: i === 0 ? 0.3 : 0.2, pointerEvents: "none",
            }} />
          ))}

          {/* left copy */}
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontSize: 12, color: "#fbbf24", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Free Download
            </p>
            <h2 style={{ fontSize: "clamp(20px,3vw,40px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
              Start Exploring Your Databases — Today
            </h2>
            <p style={{ fontSize: 15, color: "#9ca3af", margin: "0 0 28px", lineHeight: 1.7 }}>
              Install Vidhagam and get instant access to database exploration,
              SQL querying, ER diagrams, and AI-assisted query generation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "No subscription fees — install once",
                "Works fully offline on Windows",
                "AI assistant included from day one",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#fef3c7" }}>
                  <CheckCircle2 size={16} color="#fbbf24" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* right download widget */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            width: isMobile ? "100%" : "auto", minWidth: isMobile ? 0 : 220,
          }}>
            <button
              onClick={handleDownload}
              style={{
                width: "100%",
                background: downloading ? "#b45309" : "linear-gradient(135deg,#fbbf24,#b45309)",
                color: "#000", border: "none", padding: "18px 32px",
                borderRadius: 14, fontSize: 16, fontWeight: 800,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                boxShadow: "0 0 40px rgba(251,191,36,0.25)", transition: "all 0.2s",
              }}
            >
              <Download size={20} />
              {downloading ? "Downloading..." : "Download Free"}
            </button>
            <p style={{ fontSize: 12, color: "#4b5563", margin: 0, textAlign: "center" }}>
              Vidhagam SQLite Manager.exe · Version 1.0<br />Windows 10 / 11 · 64-bit
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
              <ShieldCheck size={13} color="#fbbf24" /> Safe & verified installer
            </div>
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
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#fbbf24,#b45309)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
          }}>🗄</div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            Vidhagam <span style={{ color: "#fbbf24" }}>SQLite</span>
          </span>
        </div>
        <p style={{ fontSize: 12, color: "#4b5563", margin: 0 }}>
          © 2026 Vidhagam · AI-Powered SQLite Database Manager · Version 1.0
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
          <ShieldCheck size={13} color="#fbbf24" /> Windows 64-bit · Safe Installer
        </div>
      </footer>
    </div>
  );
};

/* ─── feature grid cell with hover ───────────────────────── */
function FeatureCell({ f }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#080500" : "#000",
        padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: 14,
        transition: "background 0.2s", cursor: "default",
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: "#1c1000", border: "1px solid #92400e",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {f.icon}
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{f.title}</p>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
      </div>
    </div>
  );
}

export default DownloadPage;