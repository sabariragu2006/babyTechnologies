import { useState, useEffect } from "react";
import {
  Bug, Lightbulb, BookOpen, Heart, Star, GitFork, Users, Download,
  Code2, Palette, FileText, ShieldCheck, Cpu, Network, Database,
  Zap, Puzzle, Monitor, BarChart3, CheckCircle2, ArrowRight, GitPullRequest,
} from "lucide-react";

const GITHUB_URL = "https://github.com/sabariragu2006/vidhagam";

const DONATION_AMOUNTS = [
  { amount: 15,  label: "₹15",  desc: "Buy us a coffee",     tag: ""        },
  { amount: 99,  label: "₹99",  desc: "Support a sprint",    tag: ""        },
  { amount: 199, label: "₹199", desc: "Power a new feature", tag: "Popular" },
  { amount: 499, label: "₹499", desc: "Sponsor a milestone", tag: ""        },
];

const STATS = [
  { icon: <Star    size={28} color="#fbbf24" />, value: "1.2k+", label: "GitHub Stars" },
  { icon: <GitFork size={28} color="#fbbf24" />, value: "340+",  label: "Forks"        },
  { icon: <Users   size={28} color="#fbbf24" />, value: "28",    label: "Contributors" },
  { icon: <Download size={28} color="#fbbf24" />, value: "5k+",  label: "Downloads"    },
];

const GH_CARDS = [
  { icon: <GitPullRequest size={22} color="#fbbf24" />, title: "Contribute Code",  desc: "Pick an open issue or implement a roadmap feature. All skill levels welcome.",       href: `${GITHUB_URL}/pulls`       },
  { icon: <Bug            size={22} color="#fbbf24" />, title: "Report Bugs",      desc: "Found something broken? Open a detailed issue and help us reproduce it fast.",        href: `${GITHUB_URL}/issues`      },
  { icon: <Lightbulb      size={22} color="#fbbf24" />, title: "Feature Requests", desc: "Have an idea that improves your workflow? Start a discussion — we want to hear it.", href: `${GITHUB_URL}/discussions` },
  { icon: <BookOpen       size={22} color="#fbbf24" />, title: "Improve Docs",     desc: "Clarify setup guides, add examples, or write tutorials for new users.",              href: `${GITHUB_URL}/wiki`        },
];

const WAYS = [
  { icon: <Bug         size={20} color="#fbbf24" />, title: "Bug Fixes",                desc: "Hunt and squash bugs to keep the app stable and reliable."   },
  { icon: <Code2       size={20} color="#fbbf24" />, title: "Feature Development",      desc: "Build new capabilities and extend the core functionality."    },
  { icon: <Palette     size={20} color="#fbbf24" />, title: "UI/UX Improvements",       desc: "Refine the interface for better developer ergonomics."        },
  { icon: <FileText    size={20} color="#fbbf24" />, title: "Documentation",            desc: "Write guides, tutorials, and API references."                 },
  { icon: <ShieldCheck size={20} color="#fbbf24" />, title: "Testing",                  desc: "Write tests and improve code coverage across the project."    },
  { icon: <Cpu         size={20} color="#fbbf24" />, title: "AI Features",              desc: "Enhance the AI query assistant and NLP capabilities."         },
  { icon: <Network     size={20} color="#fbbf24" />, title: "ER Diagram Enhancements",  desc: "Improve schema visualization and export tools."               },
  { icon: <Database    size={20} color="#fbbf24" />, title: "Database Tooling",         desc: "Add support for new SQLite features and edge cases."          },
];

const ROADMAP = [
  { icon: <Zap      size={18} color="#fbbf24" />, title: "AI SQL Generation",                status: "In Progress", bg: "rgba(34,197,94,0.12)",  color: "#22c55e", border: "rgba(34,197,94,0.3)"   },
  { icon: <GitFork  size={18} color="#fbbf24" />, title: "Database Schema Comparison",       status: "Planned",     bg: "rgba(96,165,250,0.12)", color: "#60a5fa", border: "rgba(96,165,250,0.3)"  },
  { icon: <FileText size={18} color="#fbbf24" />, title: "Export to PDF",                    status: "Planned",     bg: "rgba(96,165,250,0.12)", color: "#60a5fa", border: "rgba(96,165,250,0.3)"  },
  { icon: <Network  size={18} color="#fbbf24" />, title: "Advanced ER Diagram Visualization",status: "Research",    bg: "rgba(192,132,252,0.12)",color: "#c084fc", border: "rgba(192,132,252,0.3)" },
  { icon: <Puzzle   size={18} color="#fbbf24" />, title: "Plugin System",                    status: "Research",    bg: "rgba(192,132,252,0.12)",color: "#c084fc", border: "rgba(192,132,252,0.3)" },
  { icon: <Monitor  size={18} color="#fbbf24" />, title: "Cross-Platform Support",           status: "Future",      bg: "rgba(148,163,184,0.12)",color: "#94a3b8", border: "rgba(148,163,184,0.3)" },
  { icon: <BarChart3 size={18} color="#fbbf24" />, title: "Database Performance Analyzer",  status: "Future",      bg: "rgba(148,163,184,0.12)",color: "#94a3b8", border: "rgba(148,163,184,0.3)" },
];

const WHY = [
  { title: "Faster Feature Development",    desc: "Ship roadmap features weeks earlier with dedicated development time."            },
  { title: "Better AI Capabilities",        desc: "Invest in smarter SQL generation, context-aware suggestions, and NLP accuracy." },
  { title: "Enhanced ER Diagram Tools",     desc: "Richer schema visualization, export formats, and diff comparison."              },
  { title: "Improved Developer Experience", desc: "Polish the UI, reduce friction, and build a better developer workflow."         },
  { title: "Long-Term Maintenance",         desc: "Sustain security patches, dependency updates, and platform support."            },
  { title: "Community-Driven Innovation",   desc: "Fund bounties for community-requested features and ideas."                      },
];

/* ─── tokens ────────────────────────────────────────────── */
const T = {
  black:     "#000",
  surface:   "#080500",
  card:      "#0a0700",
  border:    "#2a1f00",
  borderHov: "#92400e",
  amber:     "#fbbf24",
  amberDim:  "#1c1000",
  text:      "#fff",
  muted:     "#9ca3af",
  faint:     "#6b7280",
  fainter:   "#4b5563",
  mono:      "'Courier New', monospace",
  sans:      "'Segoe UI', sans-serif",
};

/* ─── breakpoint hook ───────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

/* ─── atoms ─────────────────────────────────────────────── */
const Label = ({ children }) => (
  <p style={{ fontSize: 12, color: T.amber, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", margin: "0 0 12px", fontFamily: T.mono }}>
    {children}
  </p>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: "clamp(22px,3vw,40px)", fontWeight: 800, margin: "0 0 14px",
               letterSpacing: "-0.5px", color: T.text }}>
    {children}
  </h2>
);

/* ─── HoverCard ─────────────────────────────────────────── */
function HoverCard({ children, style = {}, ...rest }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#0d0900" : T.card,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: 16,
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
        transform: hov ? "translateY(-4px)" : "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════ */
export default function ContributePage() {
  const [selected, setSelected]   = useState(199);
  const [custom, setCustom]       = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const w = useWindowWidth();


  const handleDonate = () => {
  const amount = Number(useCustom ? custom : selected);
  
  if (!amount || amount < 1) {
    alert("Please enter a valid amount");
    return;
  }

  window.open(`https://razorpay.me/@ragusabari?amount=${amount * 100}`, "_blank");
};



  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const px = isMobile ? "20px" : isTablet ? "28px" : "40px";

  const donateAmt = useCustom ? custom || "?" : selected;

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: T.black,
                  color: T.text, fontFamily: T.sans, boxSizing: "border-box", overflowX: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "60px 20px 48px" : isTablet ? "72px 28px 60px" : "90px 40px 70px",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
                      width: isMobile ? 320 : 700, height: isMobile ? 200 : 320, pointerEvents: "none",
                      background: "radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
                      background: T.amberDim, border: `1px solid #92400e`,
                      borderRadius: 20, padding: "6px 16px",
                      fontSize: isMobile ? 11 : 12, color: T.amber, fontWeight: 600,
                      marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <Star size={13} fill={T.amber} color={T.amber} />
          Open Source · MIT License · Community-Powered
        </div>

        <h1 style={{ fontSize: isMobile ? "clamp(32px,9vw,48px)" : "clamp(36px,5vw,72px)",
                     fontWeight: 900, lineHeight: 1.1,
                     margin: "0 0 20px", letterSpacing: "-1px",
                     maxWidth: isMobile ? "100%" : 820 }}>
          Support{" "}
          <span style={{ background: "linear-gradient(90deg,#fbbf24,#f59e0b)",
                         WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Vidhagam
          </span>
        </h1>

        <p style={{ fontSize: isMobile ? 14 : "clamp(15px,1.5vw,18px)", color: T.muted,
                    lineHeight: 1.8, margin: "0 0 32px",
                    maxWidth: isMobile ? "100%" : 580 }}>
          Vidhagam is an AI-powered SQLite database manager built by the community, for the community.
          Every contribution — code, feedback, or financial — directly accelerates every feature on the roadmap.
        </p>

        {/* feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                      gap: 8, marginBottom: 36 }}>
          {["Database Explorer","SQL Query Editor","AI Assistant","ER Diagrams","Chat History","DB Management"].map(f => (
            <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 6,
                                   background: "#080500", border: `1px solid ${T.border}`,
                                   borderRadius: 8, padding: isMobile ? "6px 10px" : "7px 14px",
                                   fontSize: isMobile ? 11 : 13, color: T.muted, fontFamily: T.mono }}>
              <CheckCircle2 size={12} color={T.amber} /> {f}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                      gap: 12, width: "100%" }}>
          <a href="#donate"
             style={{ background: "linear-gradient(135deg,#fbbf24,#b45309)",
                      color: "#000", border: "none",
                      padding: isMobile ? "13px 24px" : "15px 34px",
                      borderRadius: 14, fontSize: isMobile ? 14 : 15, fontWeight: 800,
                      cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9,
                      boxShadow: "0 0 40px rgba(251,191,36,0.18)", textDecoration: "none" }}>
            <Heart size={17} /> Support the Project
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"
             style={{ background: "#0a0700", color: T.text, border: `1px solid ${T.border}`,
                      padding: isMobile ? "13px 20px" : "15px 28px",
                      borderRadius: 14, fontSize: isMobile ? 14 : 15, fontWeight: 700,
                      cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9,
                      textDecoration: "none" }}>
            View on GitHub
          </a>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
                        background: T.surface,
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)" }}>
        {STATS.map((s, i) => (
          <div key={s.label}
               style={{ padding: isMobile ? "20px 12px" : "28px 20px", textAlign: "center",
                        borderRight: isMobile
                          ? (i % 2 === 0 ? `1px solid ${T.border}` : "none")
                          : (i < 3 ? `1px solid ${T.border}` : "none"),
                        borderBottom: isMobile && i < 2 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
            <p style={{ fontSize: isMobile ? 22 : 30, fontWeight: 900, color: T.amber, margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: T.faint, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── GITHUB CONTRIBUTIONS ─────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "52px 20px" : isTablet ? "64px 28px" : "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>// code contributions</Label>
          <SectionTitle>Contribute on GitHub</SectionTitle>
          <p style={{ fontSize: isMobile ? 13 : 15, color: T.muted,
                      maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Every pull request, bug report, and documentation improvement makes Vidhagam better
            for every developer who uses it.
          </p>
        </div>

        <div style={{ display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
                      gap: 2, background: T.border, border: `1px solid ${T.border}`,
                      borderRadius: 20, overflow: "hidden" }}>
          {GH_CARDS.map((c, i) => <GhCardItem key={i} {...c} isMobile={isMobile} />)}
        </div>
      </section>

      {/* ── DONATION ─────────────────────────────────────── */}
      <section id="donate" style={{ width: "100%", boxSizing: "border-box",
                                     padding: isMobile ? "0 16px 60px" : `0 ${px} 80px` }}>
        <div style={{ width: "100%", boxSizing: "border-box",
                      background: "linear-gradient(135deg,#1c1000 0%,#0d0800 50%,#000 100%)",
                      border: `1px solid #92400e`, borderRadius: 24,
                      padding: isMobile ? "36px 20px" : isTablet ? "48px 32px" : "60px 48px",
                      position: "relative", overflow: "hidden" }}>
          {[260, 160].map((s, i) => (
            <div key={i} style={{ position: "absolute", right: -60 + i * 40, top: -60 + i * 40,
                                   width: s, height: s, borderRadius: "50%",
                                   border: `1px solid #92400e`, opacity: 0.25, pointerEvents: "none" }} />
          ))}

          <div style={{ textAlign: "center", marginBottom: 40, position: "relative" }}>
            <Label>// financial support</Label>
            <SectionTitle>Fuel the Development</SectionTitle>
            <p style={{ fontSize: isMobile ? 13 : 15, color: T.muted,
                        maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Vidhagam is free and open source. Financial support helps cover infrastructure,
              tools, and dedicated development time.
            </p>
          </div>

          {/* donation cards */}
          <div style={{ display: "grid",
                        gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)",
                        gap: 10, marginBottom: 28, position: "relative" }}>
            {DONATION_AMOUNTS.map(d => (
              <DonateCard key={d.amount} {...d}
                active={!useCustom && selected === d.amount}
                onClick={() => { setSelected(d.amount); setUseCustom(false); }}
                isMobile={isMobile} />
            ))}
            {/* custom */}
            <div onClick={() => setUseCustom(true)}
                 style={{ background: useCustom ? "rgba(251,191,36,0.06)" : T.card,
                          border: `2px solid ${useCustom ? T.amber : T.border}`,
                          borderRadius: 16, padding: isMobile ? "20px 12px" : "24px 16px",
                          textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                          gridColumn: isMobile ? "span 2" : "auto" }}>
              <p style={{ fontSize: 12, color: T.muted, fontWeight: 600, margin: "0 0 10px" }}>Custom</p>
              <input
                type="number" min="1" placeholder="₹ ?" value={custom}
                onChange={e => { setCustom(e.target.value); setUseCustom(true); }}
                onClick={e => e.stopPropagation()}
                style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8,
                         color: T.text, fontFamily: T.mono,
                         fontSize: isMobile ? "1.1rem" : "1.3rem", fontWeight: 700,
                         textAlign: "center", padding: "6px 12px",
                         width: "100%", outline: "none", boxSizing: "border-box" }}
              />
              <p style={{ fontSize: 11, color: T.faint, marginTop: 8 }}>Every rupee counts</p>
            </div>
          </div>

          <div style={{ textAlign: "center", position: "relative" }}>
            <button
                       onClick={handleDonate}
                       style={{ background: "linear-gradient(135deg,#fbbf24,#b45309)", color: "#000",
                       border: "none", padding: isMobile ? "14px 24px" : "17px 40px",
                       borderRadius: 14, fontSize: isMobile ? 14 : 16, fontWeight: 800,
                       cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
                       boxShadow: "0 0 40px rgba(251,191,36,0.22)",
                       width: isMobile ? "100%" : "auto", justifyContent: "center" }}>
              <Heart size={18} />
              Donate ₹{donateAmt} via Razorpay
            </button>
            <p style={{ fontSize: 12, color: T.fainter, marginTop: 12, fontFamily: T.mono }}>
              Secure · Razorpay · UPI / Card / NetBanking
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY SUPPORT ──────────────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "52px 20px" : isTablet ? "64px 28px" : "80px 40px",
                        background: T.surface }}>
        <div style={{ display: "grid",
                      gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1.4fr",
                      gap: isMobile ? 36 : 60,
                      maxWidth: 1100, margin: "0 auto", alignItems: "start" }}>
          <div style={{ textAlign: isMobile || isTablet ? "center" : "left" }}>
            <Label>// why it matters</Label>
            <SectionTitle>Why Support Vidhagam?</SectionTitle>
            <p style={{ fontSize: isMobile ? 13 : 15, color: T.muted, lineHeight: 1.75 }}>
              Your support turns ambition into shipped features. Here's exactly what every
              contribution unlocks for the community.
            </p>
          </div>
          <div>
            {WHY.map((w, i) => (
              <div key={w.title}
                   style={{ display: "flex", alignItems: "flex-start", gap: 14,
                             padding: "16px 0",
                             borderBottom: i < WHY.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: T.amber,
                                background: T.amberDim, border: `1px solid #92400e`,
                                borderRadius: 6, padding: "3px 7px", flexShrink: 0, marginTop: 2 }}>
                  0{i + 1}
                </span>
                <div>
                  <p style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, margin: "0 0 4px" }}>{w.title}</p>
                  <p style={{ fontSize: isMobile ? 12 : 13, color: T.muted, margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAYS TO CONTRIBUTE ───────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "52px 20px" : isTablet ? "64px 28px" : "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>// ways to contribute</Label>
          <SectionTitle>Find Your Path</SectionTitle>
          <p style={{ fontSize: isMobile ? 13 : 15, color: T.muted,
                      maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Whether you write code, design UI, or write docs — there's a meaningful place for you.
          </p>
        </div>

        <div style={{ display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
                      gap: 2, background: T.border, border: `1px solid ${T.border}`,
                      borderRadius: 20, overflow: "hidden" }}>
          {WAYS.map((w, i) => <WayItem key={i} {...w} isMobile={isMobile} />)}
        </div>
      </section>

      {/* ── ROADMAP ──────────────────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "52px 20px" : isTablet ? "64px 28px" : "80px 40px",
                        background: T.surface }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>// project roadmap</Label>
          <SectionTitle>What's Coming Next</SectionTitle>
          <p style={{ fontSize: isMobile ? 13 : 15, color: T.muted,
                      maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Features in flight and on the horizon. Your contribution can help ship them faster.
          </p>
        </div>

        <div style={{ maxWidth: 780, margin: "0 auto",
                      display: "flex", flexDirection: "column", gap: 10 }}>
          {ROADMAP.map((r, i) => <RoadmapRow key={i} {...r} isMobile={isMobile} />)}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ width: "100%", boxSizing: "border-box",
                        padding: isMobile ? "0 16px 60px" : `0 ${px} 80px` }}>
        <div style={{ width: "100%", boxSizing: "border-box",
                      background: "linear-gradient(135deg,#1c1000 0%,#0d0800 50%,#000 100%)",
                      border: `1px solid #92400e`, borderRadius: 24,
                      padding: isMobile ? "40px 20px" : isTablet ? "52px 32px" : "64px 48px",
                      textAlign: "center", position: "relative", overflow: "hidden" }}>
          {[280, 180].map((s, i) => (
            <div key={i} style={{ position: "absolute", left: -60 + i * 40, bottom: -60 + i * 40,
                                   width: s, height: s, borderRadius: "50%",
                                   border: `1px solid #92400e`, opacity: 0.25, pointerEvents: "none" }} />
          ))}

          <Label>// join the project</Label>
          <h2 style={{ fontSize: isMobile ? "clamp(24px,8vw,36px)" : "clamp(28px,4vw,52px)",
                       fontWeight: 900, letterSpacing: "-1px", margin: "0 0 16px" }}>
            Become a{" "}
            <span style={{ background: "linear-gradient(90deg,#fbbf24,#f59e0b)",
                           WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Contributor
            </span>
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 16, color: T.muted,
                      maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.75 }}>
            Join developers building the best open-source SQLite manager.
            Your first PR or donation starts the journey.
          </p>

          {/* terminal */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
                        padding: isMobile ? "16px 16px" : "20px 28px",
                        display: "inline-block", marginBottom: 36,
                        fontFamily: T.mono, fontSize: isMobile ? 11 : 14,
                        color: T.muted, textAlign: "left",
                        maxWidth: "100%", boxSizing: "border-box",
                        overflowX: "auto", whiteSpace: isMobile ? "nowrap" : "normal" }}>
            <div><span style={{ color: T.amber }}>$</span> <span style={{ color: T.text }}>git clone {GITHUB_URL}</span></div>
            <div><span style={{ color: T.amber }}>$</span> <span style={{ color: T.text }}>cd vidhagam {"&&"} code .</span></div>
            <div style={{ color: "#22c55e", marginTop: 6 }}># You're in. Let's build something great.</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                        gap: 12, width: "100%" }}>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"
               style={{ background: "linear-gradient(135deg,#fbbf24,#b45309)", color: "#000",
                        border: "none", padding: isMobile ? "14px 22px" : "17px 38px",
                        borderRadius: 14, fontSize: isMobile ? 14 : 16, fontWeight: 800,
                        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9,
                        boxShadow: "0 0 40px rgba(251,191,36,0.22)", textDecoration: "none" }}>
              <Users size={17} /> Become a Contributor
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"
               style={{ background: T.card, color: T.text, border: `1px solid ${T.border}`,
                        padding: isMobile ? "12px 18px" : "15px 28px",
                        borderRadius: 14, fontSize: isMobile ? 13 : 15, fontWeight: 700,
                        display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              GitHub
            </a>
            <a href="#donate"
               style={{ background: T.card, color: T.amber, border: `1px solid #92400e`,
                        padding: isMobile ? "12px 18px" : "15px 28px",
                        borderRadius: 14, fontSize: isMobile ? 13 : 15, fontWeight: 700,
                        display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
              <Heart size={16} /> Donate
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ width: "100%", boxSizing: "border-box",
                       borderTop: `1px solid ${T.border}`,
                       padding: isMobile ? "20px 20px" : "24px 40px",
                       display: "flex", flexDirection: isMobile ? "column" : "row",
                       alignItems: isMobile ? "flex-start" : "center",
                       justifyContent: "space-between",
                       flexWrap: "wrap", gap: isMobile ? 16 : 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7,
                        background: "linear-gradient(135deg,#fbbf24,#b45309)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
            🗄
          </div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            Vidhagam <span style={{ color: T.amber }}>SQLite</span>
          </span>
          <span style={{ background: T.amberDim, border: `1px solid #92400e`,
                         color: T.amber, fontFamily: T.mono, fontSize: 10,
                         fontWeight: 700, padding: "2px 8px", borderRadius: 5 }}>MIT</span>
        </div>
        <p style={{ fontSize: 11, color: T.fainter, margin: 0 }}>
          © {new Date().getFullYear()} Vidhagam · Built and maintained by{" "}
          <span style={{ color: T.amber }}>Sabari</span> · Open Source Forever
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.faint }}>
          <ShieldCheck size={13} color={T.amber} /> AI-Powered SQLite Database Manager
        </div>
      </footer>
    </div>
  );
}

/* ─── sub-components ─────────────────────────────────────── */

function GhCardItem({ icon, title, desc, href, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
       style={{ background: hov ? "#0d0900" : "#000",
                padding: isMobile ? "22px 18px" : "32px 28px",
                display: "flex", alignItems: "flex-start", gap: 16,
                textDecoration: "none", color: "inherit", transition: "background 0.2s" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1c1000",
                    border: "1px solid #92400e", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, margin: "0 0 6px", color: "#fff" }}>{title}</p>
        <p style={{ fontSize: isMobile ? 12 : 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{desc}</p>
        {hov && (
          <p style={{ fontSize: 12, color: "#fbbf24", margin: "10px 0 0",
                      display: "flex", alignItems: "center", gap: 4 }}>
            <ArrowRight size={13} /> Open on GitHub
          </p>
        )}
      </div>
    </a>
  );
}

function DonateCard({ label, desc, tag, active, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
         onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{ background: active ? "rgba(251,191,36,0.06)" : "#0a0700",
                  border: `2px solid ${active ? "#fbbf24" : hov ? "#92400e" : "#2a1f00"}`,
                  borderRadius: 16, padding: isMobile ? "22px 12px" : "26px 16px",
                  textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                  position: "relative",
                  transform: hov && !active ? "translateY(-3px)" : "none" }}>
      {tag && (
        <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                       background: "#fbbf24", color: "#000", fontFamily: "'Courier New',monospace",
                       fontSize: 10, fontWeight: 800, padding: "3px 12px",
                       borderRadius: 100, whiteSpace: "nowrap" }}>
          {tag}
        </span>
      )}
      <p style={{ fontSize: isMobile ? "1.4rem" : "1.9rem", fontWeight: 900,
                  fontFamily: "'Courier New',monospace",
                  color: active ? "#fbbf24" : "#fff", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontSize: isMobile ? 11 : 12, color: "#6b7280", margin: 0 }}>{desc}</p>
    </div>
  );
}

function WayItem({ icon, title, desc, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{ background: hov ? "#0d0900" : "#000",
                  padding: isMobile ? "22px 18px" : "28px 24px",
                  transition: "background 0.2s", cursor: "default" }}>
      <div style={{ width: 42, height: 42, borderRadius: 11, background: "#1c1000",
                    border: "1px solid #92400e", display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        {icon}
      </div>
      <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, margin: "0 0 6px", color: "#fff" }}>{title}</p>
      <p style={{ fontSize: 12, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function RoadmapRow({ icon, title, status, bg, color, border, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{ background: hov ? "#0d0900" : "#0a0700",
                  border: `1px solid ${hov ? "#92400e" : "#2a1f00"}`,
                  borderRadius: 12, padding: isMobile ? "14px 16px" : "18px 22px",
                  display: "flex", alignItems: "center", gap: 14,
                  transition: "all 0.2s",
                  transform: hov ? "translateX(4px)" : "none" }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: "#1c1000",
                    border: "1px solid #92400e", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, color: "#fff", flex: 1, margin: 0 }}>{title}</p>
      <span style={{ background: bg, color, border: `1px solid ${border}`,
                     fontFamily: "'Courier New',monospace",
                     fontSize: isMobile ? 10 : 11, fontWeight: 700,
                     padding: isMobile ? "3px 9px" : "4px 12px",
                     borderRadius: 100, flexShrink: 0, whiteSpace: "nowrap" }}>
        {status}
      </span>
    </div>
  );
}