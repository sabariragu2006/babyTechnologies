import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  ExternalLink,
  Download,
  Code2,
  Database,
  Globe,
  Cpu,
  Wrench,
  ArrowRight,
  Star,
  ShieldCheck,
  Monitor,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

// ── Responsive breakpoint hook ────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

const DeveloperPage = ({ navigate }) => {
  const width = useWindowWidth();
  const isMobile  = width < 640;
  const isTablet  = width < 1024;

  const [hoveredProject, setHoveredProject]   = useState(null);
  const [copiedEmail,    setCopiedEmail]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sabariragu2006@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // ── Data ─────────────────────────────────────────────────────

  const skillGroups = [
    {
      icon: <Globe size={16} color="#fbbf24" />,
      label: "Frontend",
      skills: ["React.js", "JavaScript", "HTML", "CSS", "Bootstrap"],
    },
    {
      icon: <Code2 size={16} color="#fbbf24" />,
      label: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "MERN Stack"],
    },
    {
      icon: <Database size={16} color="#fbbf24" />,
      label: "Database",
      skills: ["MongoDB", "SQLite", "SQL"],
    },
    {
      icon: <Monitor size={16} color="#fbbf24" />,
      label: "Desktop",
      skills: ["C#", "WPF", "WinForms", ".NET Framework"],
    },
    {
      icon: <Cpu size={16} color="#fbbf24" />,
      label: "AI & Automation",
      skills: ["Gemini AI API", "OCR (Tesseract)", "AI Integration"],
    },
    {
      icon: <Wrench size={16} color="#fbbf24" />,
      label: "Tools",
      skills: ["Git", "GitHub", "Visual Studio", "VS Code"],
    },
  ];

  const projects = [
    {
      id: "maadala",
      emoji: "💰",
      name: "Maadala",
      tagline: "Personal Finance Tracker",
      desc: "A full-stack web app for tracking personal finances, managing budgets, visualising spending patterns, and analysing portfolio performance — built with the MERN stack.",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js"],
      liveUrl: "https://dulcet-phoenix-32f7f5.netlify.app/",
      githubUrl: "https://github.com/sabariragu2006/",
      badge: "Live · Web App",
    },
    {
      id: "thugil",
      emoji: "🧵",
      name: "Thugil ERP",
      tagline: "Textile Shop Management",
      desc: "Offline-first desktop ERP for Indian textile businesses. GST billing, inventory tracking, supplier CRM, customer management, and detailed sales analytics.",
      tech: ["C#", "WPF", ".NET", "SQLite", "MVVM"],
      downloadUrl: "/downloads/textileshop.exe",
      aboutUrl: "about",
      badge: "Desktop App",
    },
    {
      id: "vidhagam",
      emoji: "🗄",
      name: "Vidhagam",
      tagline: "AI-Powered SQLite Manager",
      desc: "Professional desktop SQLite manager with VS Code-style dark UI, multi-session support, AI query generation via Gemini, ER diagram export, and CSV import/export.",
      tech: ["C#", "WPF", ".NET 4.7.2", "SQLite", "Gemini AI"],
      downloadUrl: "/downloads/vidhagam.exe",
      badge: "Desktop App",
    },
  ];

  const highlights = [
    { value: "3+",   label: "Projects"       },
    { value: "AI",   label: "Integrated"     },
    { value: "6+",   label: "Tech Stacks"    },
    { value: "Open", label: "to Freelance"   },
  ];

  const socials = [
    {
      icon: "🐙",
      label: "GitHub",
      url: "https://github.com/sabariragu2006/",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/sabariragu/",
    },
    {
      icon: <Mail size={15} />,
      label: copiedEmail ? "Copied!" : "Copy Email",
      url: null,
      onClick: handleCopyEmail,
    },
  ];

  // ── Shared style helpers ──────────────────────────────────────

  const goldBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #fbbf24, #b45309)",
    color: "#000",
    border: "none",
    padding: isMobile ? "13px 22px" : "16px 28px",
    borderRadius: "12px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: 800,
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 0.2s",
    boxShadow: "0 0 32px rgba(251,191,36,0.2)",
  };

  const outlineBtn = (borderCol = "#92400e", textCol = "#fbbf24") => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "transparent",
    color: textCol,
    border: `1px solid ${borderCol}`,
    padding: isMobile ? "13px 22px" : "14px 28px",
    borderRadius: "12px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s, color 0.2s",
  });

  const pill = (text, i) => (
    <span
      key={i}
      style={{
        background: "#1c1000",
        border: "1px solid #3a2500",
        borderRadius: "20px",
        padding: "4px 12px",
        fontSize: "12px",
        color: "#fef3c7",
        fontFamily: "Consolas, monospace",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );

  // ── Render ────────────────────────────────────────────────────

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "'Segoe UI', sans-serif",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section style={{
        width: "100%",
        boxSizing: "border-box",
        padding: isMobile ? "64px 20px 52px" : "90px 40px 70px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "10%", left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "320px" : "600px",
          height: isMobile ? "180px" : "300px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Avatar */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <div style={{
            width: isMobile ? "88px" : "110px",
            height: isMobile ? "88px" : "110px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fbbf24, #b45309)",
            border: "3px solid #92400e",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "38px",
            boxShadow: "0 0 40px rgba(251,191,36,0.25)",
            overflow: "hidden",
          }}>
            <img
              src="/images/sabari.png"
              alt="Sabari"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = "👨‍💻";
              }}
            />
          </div>
          <div style={{
            position: "absolute", bottom: "6px", right: "6px",
            width: "14px", height: "14px", borderRadius: "50%",
            background: "#4EC94E", border: "2px solid #000",
          }} />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#1c1000", border: "1px solid #92400e",
          borderRadius: "20px", padding: "6px 16px",
          fontSize: "12px", color: "#fbbf24", fontWeight: 600,
          marginBottom: "20px",
        }}>
          <Star size={13} fill="#fbbf24" color="#fbbf24" />
          Full Stack &amp; Desktop Developer · Tamil Nadu, India
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: isMobile ? "40px" : "clamp(40px, 5vw, 72px)",
          fontWeight: 900, lineHeight: 1.1,
          margin: "0 0 14px", letterSpacing: "-1px",
        }}>
          Hi, I'm{" "}
          <span style={{
            background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Sabari
          </span>
        </h1>

        {/* Location */}
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          color: "#6b7280", fontSize: "13px", marginBottom: "18px",
        }}>
          <MapPin size={13} color="#fbbf24" />
          Tamil Nadu, India
        </div>

        {/* Bio */}
        <p style={{
          fontSize: isMobile ? "14px" : "clamp(14px, 1.4vw, 17px)",
          color: "#9ca3af", lineHeight: 1.85,
          margin: "0 0 24px",
          maxWidth: isMobile ? "100%" : "580px",
          padding: isMobile ? "0 4px" : "0",
        }}>
          Passionate{" "}
          <strong style={{ color: "#fff" }}>Full Stack Developer</strong> and{" "}
          <strong style={{ color: "#fff" }}>BCA student</strong> building web
          apps, desktop software, AI-powered tools, and financial solutions that
          solve real-world problems.
        </p>

        {/* Freelance note */}
        <div style={{
          background: "#080500",
          border: "1px solid #2a1f00",
          borderRadius: "12px",
          padding: "14px 20px",
          maxWidth: isMobile ? "100%" : "560px",
          width: "100%",
          marginBottom: "36px",
          boxSizing: "border-box",
        }}>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0, lineHeight: 1.7 }}>
            💼{" "}
            <span style={{ color: "#fef3c7", fontWeight: 600 }}>
              Freelance Software Developer
            </span>{" "}
            — custom desktop apps, billing software, database tools,
            AI-integrated solutions, and full-stack web apps.
          </p>
        </div>

        {/* Social links */}
        <div style={{
          display: "flex", gap: "10px",
          flexWrap: "wrap", justifyContent: "center",
          marginBottom: "40px",
        }}>
          {socials.map((link, i) => (
            <a
              key={i}
              href={link.url || undefined}
              target={link.url ? "_blank" : undefined}
              rel="noreferrer"
              onClick={link.onClick}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "#1c1000", border: "1px solid #92400e",
                borderRadius: "10px",
                padding: isMobile ? "9px 16px" : "10px 20px",
                color: "#fbbf24", fontSize: "13px", fontWeight: 600,
                textDecoration: "none", cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(251,191,36,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{
          display: "flex", alignItems: "center", gap: isMobile ? "16px" : "24px",
          flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { icon: <CheckCircle2 size={14} color="#fbbf24" />, text: "Open to freelance" },
            { icon: <ShieldCheck size={14} color="#fbbf24" />,  text: "Offline-capable apps" },
            { icon: <Star size={14} color="#fbbf24" />,         text: "AI-powered solutions" },
            { icon: <Database size={14} color="#fbbf24" />,     text: "SQLite specialist" },
          ].map((b, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: isMobile ? "12px" : "13px", color: "#9ca3af",
            }}>
              {b.icon} {b.text}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        borderTop: "1px solid #2a1f00",
        borderBottom: "1px solid #2a1f00",
        background: "#080500",
        padding: "0 20px",
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      }}>
        {highlights.map((h, i) => (
          <div key={i} style={{
            padding: isMobile ? "20px 12px" : "28px 20px",
            textAlign: "center",
            borderRight: isMobile
              ? (i % 2 === 0 ? "1px solid #2a1f00" : "none")
              : (i < 3 ? "1px solid #2a1f00" : "none"),
            borderBottom: isMobile && i < 2 ? "1px solid #2a1f00" : "none",
          }}>
            <p style={{
              fontSize: isMobile ? "26px" : "32px",
              fontWeight: 900, color: "#fbbf24", margin: "0 0 4px",
            }}>
              {h.value}
            </p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              {h.label}
            </p>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: isMobile ? "56px 20px" : "80px 40px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "12px", color: "#fbbf24", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            margin: "0 0 12px",
          }}>
            Technical Skills
          </p>
          <h2 style={{
            fontSize: isMobile ? "26px" : "clamp(26px, 3vw, 42px)",
            fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px",
          }}>
            What I Build With
          </h2>
          <p style={{
            fontSize: "14px", color: "#9ca3af",
            maxWidth: "440px", margin: "0 auto", lineHeight: 1.7,
          }}>
            A versatile toolkit spanning frontend, backend, desktop, and AI —
            built through real projects and continuous learning.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "12px",
          width: "100%", boxSizing: "border-box",
        }}>
          {skillGroups.map((group, i) => (
            <div
              key={i}
              style={{
                background: "#080500",
                border: "1px solid #2a1f00",
                borderRadius: "14px",
                padding: "22px 22px",
                transition: "border-color 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#92400e";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2a1f00";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                marginBottom: "14px",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: "#1c1000", border: "1px solid #92400e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {group.icon}
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: 700, color: "#fbbf24",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {group.label}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.skills.map(pill)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: isMobile ? "0 20px 64px" : "0 40px 80px",
        borderTop: "1px solid #2a1f00",
        paddingTop: isMobile ? "56px" : "80px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "12px", color: "#fbbf24", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            margin: "0 0 12px",
          }}>
            Featured Projects
          </p>
          <h2 style={{
            fontSize: isMobile ? "26px" : "clamp(26px, 3vw, 42px)",
            fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px",
          }}>
            Things I've Built
          </h2>
          <p style={{
            fontSize: "14px", color: "#9ca3af",
            maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
          }}>
            From full-stack web apps to AI-powered desktop tools — each project
            solves a real problem.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "repeat(3, 1fr)",
          gap: "14px",
          width: "100%", boxSizing: "border-box",
        }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: hoveredProject === project.id ? "#080500" : "#000",
                border: `1px solid ${
                  hoveredProject === project.id ? "#92400e" : "#2a1f00"
                }`,
                borderRadius: "16px",
                padding: isMobile ? "24px 20px" : "30px 26px",
                display: "flex", flexDirection: "column", gap: "18px",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                transform: hoveredProject === project.id
                  ? "translateY(-3px)" : "translateY(0)",
                cursor: "default",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between",
              }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "13px",
                  background: "#1c1000", border: "1px solid #92400e",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "24px",
                }}>
                  {project.emoji}
                </div>
                <span style={{
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  color: "#fbbf24", borderRadius: "20px",
                  padding: "4px 12px", fontSize: "11px", fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>
                  {project.badge}
                </span>
              </div>

              {/* Name + desc */}
              <div>
                <h3 style={{
                  fontSize: "19px", fontWeight: 800,
                  margin: "0 0 5px", color: "#fff",
                }}>
                  {project.name}
                </h3>
                <p style={{
                  fontSize: "13px", color: "#fbbf24",
                  fontWeight: 600, margin: "0 0 10px",
                }}>
                  {project.tagline}
                </p>
                <p style={{
                  fontSize: "13px", color: "#6b7280",
                  lineHeight: 1.7, margin: 0,
                }}>
                  {project.desc}
                </p>
              </div>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {project.tech.map(pill)}
              </div>

              {/* Buttons */}
              <div style={{
                display: "flex", gap: "8px",
                flexWrap: "wrap", marginTop: "4px",
              }}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "7px",
                      background: "linear-gradient(135deg, #fbbf24, #b45309)",
                      color: "#000", border: "none",
                      padding: "9px 16px", borderRadius: "8px",
                      fontSize: "13px", fontWeight: 700,
                      textDecoration: "none", cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}

                {project.downloadUrl && (
                  <a
                    href={project.downloadUrl}
                    download
                    style={{
                      display: "flex", alignItems: "center", gap: "7px",
                      background: "linear-gradient(135deg, #fbbf24, #b45309)",
                      color: "#000", border: "none",
                      padding: "9px 16px", borderRadius: "8px",
                      fontSize: "13px", fontWeight: 700,
                      textDecoration: "none", cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <Download size={13} /> Download
                  </a>
                )}

                {project.aboutUrl && (
                  <button
                    onClick={() => navigate(project.aboutUrl)}
                    style={{
                      display: "flex", alignItems: "center", gap: "7px",
                      background: "transparent",
                      border: "1px solid #3a2500", color: "#9ca3af",
                      padding: "9px 16px", borderRadius: "8px",
                      fontSize: "13px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#fbbf24";
                      e.currentTarget.style.color = "#fbbf24";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#3a2500";
                      e.currentTarget.style.color = "#9ca3af";
                    }}
                  >
                    About App <ArrowRight size={13} />
                  </button>
                )}

                <a
                  href="https://github.com/sabariragu2006/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    background: "transparent",
                    border: "1px solid #2a1f00", color: "#6b7280",
                    padding: "9px 16px", borderRadius: "8px",
                    fontSize: "13px", fontWeight: 600,
                    textDecoration: "none", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#92400e";
                    e.currentTarget.style.color = "#fbbf24";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2a1f00";
                    e.currentTarget.style.color = "#6b7280";
                  }}
                >
                  🐙 Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT CTA
      ════════════════════════════════════════ */}
      <section style={{
        width: "100%", boxSizing: "border-box",
        padding: isMobile ? "0 20px 64px" : "0 40px 80px",
      }}>
        <div style={{
          width: "100%", boxSizing: "border-box",
          background: "linear-gradient(135deg, #1c1000 0%, #0d0800 50%, #000 100%)",
          border: "1px solid #92400e",
          borderRadius: "20px",
          padding: isMobile ? "36px 24px" : "56px 48px",
          display: "flex",
          flexDirection: isMobile ? "column" : isTablet ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "36px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative rings */}
          <div style={{
            position: "absolute", right: "-60px", top: "-60px",
            width: "220px", height: "220px", borderRadius: "50%",
            border: "1px solid #92400e", opacity: 0.25,
            pointerEvents: "none",
          }} />

          {/* Left content */}
          <div style={{ maxWidth: isMobile ? "100%" : "520px" }}>
            <p style={{
              fontSize: "11px", color: "#fbbf24", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              margin: "0 0 12px",
            }}>
              Get In Touch
            </p>
            <h2 style={{
              fontSize: isMobile ? "22px" : "clamp(22px, 3vw, 36px)",
              fontWeight: 900, margin: "0 0 14px",
              lineHeight: 1.2, letterSpacing: "-0.5px",
            }}>
              Let's Build Something Together
            </h2>
            <p style={{
              fontSize: "14px", color: "#9ca3af",
              margin: "0 0 24px", lineHeight: 1.7,
            }}>
              Open to freelance projects, collaborations, and full-time
              opportunities. Reach out — I'd love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Custom desktop & web applications",
                "AI-integrated tools and automation",
                "Database design and management",
              ].map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontSize: "13px", color: "#fef3c7",
                }}>
                  <CheckCircle2 size={15} color="#fbbf24" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right buttons */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "stretch", gap: "10px",
            width: isMobile ? "100%" : "220px",
            flexShrink: 0,
          }}>
            <a
              href="mailto:sabariragu2006@gmail.com"
              style={goldBtn}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Mail size={16} /> Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/sabariragu/"
              target="_blank"
              rel="noreferrer"
              style={outlineBtn()}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/sabariragu2006/"
              target="_blank"
              rel="noreferrer"
              style={outlineBtn("#2a1f00", "#9ca3af")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fbbf24";
                e.currentTarget.style.borderColor = "#92400e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9ca3af";
                e.currentTarget.style.borderColor = "#2a1f00";
              }}
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{
        width: "100%", boxSizing: "border-box",
        borderTop: "1px solid #2a1f00",
        padding: isMobile ? "20px" : "24px 40px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "26px", height: "26px", borderRadius: "7px",
            background: "linear-gradient(135deg, #fbbf24, #b45309)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "13px",
          }}>
            🗄
          </div>
          <span style={{ fontWeight: 700, fontSize: "14px" }}>
            Vidhagam <span style={{ color: "#fbbf24" }}>SQLite</span>
          </span>
        </div>

        <p style={{ fontSize: "12px", color: "#4b5563", margin: 0 }}>
          Built by{" "}
          <a
            href="https://github.com/sabariragu2006/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fbbf24", textDecoration: "none", fontWeight: 600 }}
          >
            Sabari
          </a>{" "}
          · Tamil Nadu, India · © 2025
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", color: "#6b7280",
        }}>
          <ShieldCheck size={13} color="#fbbf24" />
          Offline · Open Source · Free Forever
        </div>
      </footer>
    </div>
  );
};

export default DeveloperPage;