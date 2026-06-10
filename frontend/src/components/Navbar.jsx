import { useState, useEffect } from "react";
import { Download, Database, Menu, X } from "lucide-react";

const Navbar = ({ navigate, currentPage, onDownload, downloading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 // Replace this:
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

// With this:
const [isMobile, setIsMobile] = useState(
  () => window.matchMedia("(max-width: 767px)").matches
);

useEffect(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  const handler = (e) => setIsMobile(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);

  // close menu on route change
  useEffect(() => { setMenuOpen(false); }, [currentPage]);

  const navLinks = [
    { label: "Download",   page: "home"       },
    { label: "About",      page: "about"      },
    { label: "Developer",  page: "developer"  },
    { label: "Contribute", page: "contribute" },
  ];

  return (
    <>
      <nav style={{
        width: "100%", boxSizing: "border-box",
        backgroundColor: "rgba(0,0,0,0.97)",
        borderBottom: "1px solid #2a1f00",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          padding: isMobile ? "0 20px" : "0 40px",
          height: 64,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>

          {/* ── Logo ── */}
          <div
            onClick={() => navigate("home")}
            style={{ display: "flex", alignItems: "center", gap: 10,
                     flexShrink: 0, cursor: "pointer" }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg,#fbbf24,#b45309)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Database size={18} color="#000" />
            </div>
            {!isMobile && (
              <span style={{ fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-0.4px" }}>
                <span style={{ color: "#fbbf24" }}>Vidhagam</span> SQLite
              </span>
            )}
            {isMobile && (
              <span style={{ fontWeight: 800, fontSize: 16, color: "#fbbf24", letterSpacing: "-0.4px" }}>
                Agaradhi
              </span>
            )}
          </div>

          {/* ── Desktop nav links ── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4,
                          flex: 1, justifyContent: "center" }}>
              {navLinks.map(link => (
                <NavButton
                  key={link.label}
                  label={link.label}
                  active={currentPage === link.page}
                  onClick={() => navigate(link.page)}
                />
              ))}
            </div>
          )}

          {/* ── Right actions ── */}
          <div style={{ display: "flex", alignItems: "center",
                        gap: isMobile ? 8 : 12, flexShrink: 0 }}>
            {/* version badge — hide on very small screens */}
            {!isMobile && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#1c1000", border: "1px solid #92400e",
                borderRadius: 20, padding: "5px 12px",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />
                <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>v1.0 Live</span>
              </div>
            )}

            {/* download button */}
            <DownloadBtn
              onDownload={onDownload}
              downloading={downloading}
              compact={isMobile}
            />

            {/* hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  background: menuOpen ? "#1c1000" : "transparent",
                  border: `1px solid ${menuOpen ? "#92400e" : "#2a1f00"}`,
                  borderRadius: 8, padding: "7px 8px",
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#fbbf24", transition: "background 0.2s, border-color 0.2s",
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {isMobile && menuOpen && (
          <div style={{
            borderTop: "1px solid #2a1f00",
            background: "rgba(0,0,0,0.98)",
            padding: "12px 20px 20px",
            display: "flex", flexDirection: "column", gap: 4,
            animation: "slideDown 0.18s ease",
          }}>
            {navLinks.map(link => (
              <MobileNavButton
                key={link.label}
                label={link.label}
                active={currentPage === link.page}
                onClick={() => { navigate(link.page); setMenuOpen(false); }}
              />
            ))}

            {/* version pill inside drawer on mobile */}
            <div style={{
              marginTop: 12,
              display: "flex", alignItems: "center", gap: 6,
              background: "#1c1000", border: "1px solid #92400e",
              borderRadius: 20, padding: "6px 14px", alignSelf: "flex-start",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />
              <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>v1.0 Live</span>
            </div>
          </div>
        )}
      </nav>

      {/* slide-down keyframe */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
};

/* ─── Desktop nav button ─────────────────────────────────── */
function NavButton({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active || hov ? "#1c1000" : "transparent",
        border: "none",
        color: active || hov ? "#fbbf24" : "#9ca3af",
        fontSize: 14, fontWeight: 500,
        cursor: "pointer", padding: "8px 16px", borderRadius: 8,
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Mobile nav button ──────────────────────────────────── */
function MobileNavButton({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active ? "#1c1000" : hov ? "#0d0800" : "transparent",
        border: `1px solid ${active ? "#92400e" : "transparent"}`,
        color: active ? "#fbbf24" : hov ? "#e5e7eb" : "#9ca3af",
        fontSize: 15, fontWeight: active ? 700 : 500,
        cursor: "pointer", padding: "12px 16px", borderRadius: 10,
        textAlign: "left", width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
      }}
    >
      {label}
      {active && (
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#fbbf24", flexShrink: 0,
        }} />
      )}
    </button>
  );
}

/* ─── Download button (compact = icon-only on mobile) ─────── */
function DownloadBtn({ onDownload, downloading, compact }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onDownload}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: downloading
          ? "#92400e"
          : hov
          ? "linear-gradient(135deg,#f59e0b,#92400e)"
          : "linear-gradient(135deg,#fbbf24,#b45309)",
        color: "#000", border: "none",
        padding: compact ? "9px 12px" : "9px 20px",
        borderRadius: 9, fontSize: 13, fontWeight: 700,
        cursor: "pointer", display: "flex", alignItems: "center",
        gap: compact ? 0 : 7,
        opacity: downloading ? 0.8 : 1,
        transition: "background 0.2s, opacity 0.2s",
        whiteSpace: "nowrap",
      }}
      title={compact ? (downloading ? "Downloading…" : "Download") : undefined}
    >
      <Download size={15} color="#000" />
      {!compact && (downloading ? "Downloading..." : "Download")}
    </button>
  );
}

export default Navbar;