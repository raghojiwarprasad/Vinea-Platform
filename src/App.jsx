import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════
const T = {
  bg: "#FAFAF7",
  bgAlt: "#F3F2EE",
  surface: "#FFFFFF",
  surfaceDark: "#111111",
  text: "#1A1A1A",
  textSecondary: "#555555",
  textMuted: "#8A8A8A",
  accent: "#1A3A2A",
  accentLight: "#2A5A3A",
  border: "#E2E0DB",
  borderDark: "#D0CEC8",
  white: "#FFFFFF",
  error: "#9B2C2C",
  success: "#276749",
};

const F = {
  display: "'Libre Baskerville', 'Georgia', serif",
  body: "'Helvetica Neue', 'Arial', sans-serif",
  mono: "'SF Mono', 'Consolas', monospace",
};

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "founders", label: "Founders" },
    { id: "buyers", label: "Investors" },
    { id: "partners", label: "Partners" },
    { id: "platform", label: "Platform" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(250,250,247,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center", height: 64,
      }}>
        <button onClick={() => setPage("home")} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: F.mono, fontSize: 13, fontWeight: 600, letterSpacing: 4,
          color: T.text, textTransform: "uppercase",
        }}>
          Vinea
        </button>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "4px 0",
              fontFamily: F.body, fontSize: 13, color: page === l.id ? T.text : T.textSecondary,
              fontWeight: page === l.id ? 600 : 400,
              borderBottom: page === l.id ? `1.5px solid ${T.text}` : "1.5px solid transparent",
              transition: "all 0.2s",
            }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => setPage("contact")} style={{
            background: T.surfaceDark, color: T.white, border: "none",
            padding: "8px 20px", fontFamily: F.body, fontSize: 12, fontWeight: 500,
            cursor: "pointer", letterSpacing: 0.5,
          }}>
            Start a conversation
          </button>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════
function Landing({ setPage }) {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState(0);

  const personas = [
    { id: "founders", label: "I'm a founder thinking about succession", sub: "Explore your options confidentially" },
    { id: "buyers", label: "I'm an investor looking for acquisitions", sub: "Access structured industrial deal flow" },
    { id: "partners", label: "I'm an intermediary with deal flow", sub: "Submit deals or explore partnerships" },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    setPhase(1);
    setTimeout(() => { setPhase(2); setPage(id); }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 40px", maxWidth: 1200, margin: "0 auto",
      }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{
            fontFamily: F.mono, fontSize: 11, color: T.textMuted,
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 32,
          }}>
            European SME Succession Platform
          </div>

          <h1 style={{
            fontFamily: F.display, fontSize: 52, fontWeight: 400,
            color: T.text, lineHeight: 1.15, margin: "0 0 28px", letterSpacing: -0.5,
          }}>
            Industrial succession,<br />institutionalized.
          </h1>

          <p style={{
            fontFamily: F.body, fontSize: 18, color: T.textSecondary,
            lineHeight: 1.65, maxWidth: 560, margin: "0 0 56px",
          }}>
            We transform founder-owned SMEs into scalable investment platforms and connect them with long-term capital. Across Europe, €3.8 trillion in enterprise value is at risk from the succession gap. Vinea is the infrastructure to solve it.
          </p>

          {/* Guided Conversation UI */}
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            padding: "36px 40px", maxWidth: 560,
          }}>
            <div style={{
              fontFamily: F.body, fontSize: 15, color: T.text,
              marginBottom: 28, fontWeight: 500,
            }}>
              Welcome to Vinea. How can we help?
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  style={{
                    background: selected === p.id ? T.surfaceDark : T.bg,
                    border: `1px solid ${selected === p.id ? T.surfaceDark : T.border}`,
                    padding: "18px 24px", cursor: "pointer", textAlign: "left",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "all 0.25s ease",
                    opacity: phase === 2 && selected !== p.id ? 0.3 : 1,
                    transform: phase === 2 && selected === p.id ? "translateX(8px)" : "translateX(0)",
                  }}
                >
                  <div>
                    <div style={{
                      fontFamily: F.body, fontSize: 14,
                      color: selected === p.id ? T.white : T.text, fontWeight: 500, marginBottom: 4,
                    }}>
                      {p.label}
                    </div>
                    <div style={{
                      fontFamily: F.body, fontSize: 12,
                      color: selected === p.id ? "rgba(255,255,255,0.6)" : T.textMuted,
                    }}>
                      {p.sub}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: F.body, fontSize: 18,
                    color: selected === p.id ? T.white : T.textMuted,
                    transition: "transform 0.2s",
                    transform: selected === p.id ? "translateX(4px)" : "translateX(0)",
                  }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
          background: T.border, marginTop: 80, maxWidth: 800,
        }}>
          {[
            { val: "121", label: "Deals sourced" },
            { val: "€580M", label: "Pipeline value" },
            { val: "12+", label: "Institutional buyers" },
            { val: "35", label: "Cluster-assigned" },
          ].map((s, i) => (
            <div key={i} style={{ background: T.bg, padding: "28px 24px" }}>
              <div style={{ fontFamily: F.display, fontSize: 28, color: T.text, marginBottom: 6 }}>{s.val}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section — Dark */}
      <section style={{ background: T.surfaceDark, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            fontFamily: F.mono, fontSize: 11, color: "rgba(255,255,255,0.35)",
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 32,
          }}>The Problem</div>
          <h2 style={{
            fontFamily: F.display, fontSize: 36, color: T.white,
            fontWeight: 400, lineHeight: 1.3, maxWidth: 700, margin: "0 0 56px",
          }}>
            €3.8 trillion in European enterprise value has no succession plan. The infrastructure to solve this doesn't exist yet.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.08)" }}>
            {[
              { stat: "9.5M", desc: "SMEs facing succession across the EU", detail: "55% cannot find a successor at any price" },
              { stat: "35%", desc: "DACH SME owners are 55+", detail: "Average founder age is 60–70 years" },
              { stat: "€1.2T", desc: "At risk in Germany alone", detail: "1.3M facing succession within 5 years" },
            ].map((item, i) => (
              <div key={i} style={{ background: T.surfaceDark, padding: "40px 32px" }}>
                <div style={{ fontFamily: F.display, fontSize: 42, color: T.white, marginBottom: 12 }}>{item.stat}</div>
                <div style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 8, lineHeight: 1.5 }}>{item.desc}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — 5-step */}
      <section style={{ padding: "100px 40px", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>The Vinea Model</div>
          <h2 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 400, color: T.text, lineHeight: 1.3, maxWidth: 600, margin: "0 0 56px" }}>
            From fragmented succession risk to institutional-grade investment platforms.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {[
              { num: "01", title: "Source", desc: "AI deal engine identifies founder-owned SMEs approaching succession across DACH." },
              { num: "02", title: "Underwrite", desc: "1,000+ parameter model assesses risk, value, and institutional readiness." },
              { num: "03", title: "Transform", desc: "Operational engine institutionalizes governance, finance, team, and systems." },
              { num: "04", title: "Cluster", desc: "SMEs grouped into thematic platforms matching buyer thesis and industry tailwinds." },
              { num: "05", title: "Exit", desc: "Structured cohort exits to PE, strategics, and family offices at institutional multiples." },
            ].map((step, i) => (
              <div key={i} style={{ padding: "0 24px", borderLeft: i > 0 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, marginBottom: 16 }}>{step.num}</div>
                <div style={{ fontFamily: F.body, fontSize: 16, color: T.text, fontWeight: 600, marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section style={{ padding: "80px 40px", background: T.bgAlt, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>Case Study</div>
            <h3 style={{ fontFamily: F.display, fontSize: 28, fontWeight: 400, color: T.text, lineHeight: 1.3, margin: "0 0 20px" }}>
              Spectrum Elektrotechnik GmbH
            </h3>
            <p style={{ fontFamily: F.body, fontSize: 14, color: T.textSecondary, lineHeight: 1.7, margin: "0 0 32px" }}>
              A distressed industrial SME transformed within 10 months using the Vinea operating model. Revenue doubled, EBITDA expanded to 40%, and customer base grew from 5 to 120+ accounts.
            </p>
            <button onClick={() => setPage("platform")} style={{
              background: "none", border: `1px solid ${T.text}`, padding: "10px 24px",
              fontFamily: F.body, fontSize: 13, cursor: "pointer", color: T.text,
            }}>
              Read the full case →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, alignSelf: "start" }}>
            {[
              { label: "Revenue recovery", val: "~2×", sub: "vs. historical peak" },
              { label: "EBITDA margin", val: "40%", sub: "from 10% at acquisition" },
              { label: "Customer base", val: "120+", sub: "from 5 active accounts" },
              { label: "Team continuity", val: "30 FTE", sub: "stabilized and retained" },
            ].map((m, i) => (
              <div key={i} style={{ background: T.surface, padding: "24px 20px" }}>
                <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, marginBottom: 8 }}>{m.label}</div>
                <div style={{ fontFamily: F.display, fontSize: 28, color: T.text, marginBottom: 4 }}>{m.val}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 40px", background: T.bg, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 400, color: T.text, margin: "0 0 20px" }}>
            Every conversation is confidential.
          </h2>
          <p style={{ fontFamily: F.body, fontSize: 15, color: T.textSecondary, lineHeight: 1.7, margin: "0 0 40px" }}>
            Whether you're a founder exploring your options, an investor seeking deal flow, or a partner with opportunities — we start with a private conversation.
          </p>
          <button onClick={() => setPage("contact")} style={{
            background: T.surfaceDark, color: T.white, border: "none",
            padding: "14px 36px", fontFamily: F.body, fontSize: 14, cursor: "pointer",
          }}>
            Start a conversation
          </button>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SHARED FIELD COMPONENT
// ═══════════════════════════════════════════════════════
function Field({ label, type = "text", value, onChange, options, suffix, half, placeholder, multiline }) {
  return (
    <div style={{ flex: half ? "1 1 48%" : "1 1 100%" }}>
      <label style={{ display: "block", fontFamily: F.body, fontSize: 12, color: T.textSecondary, marginBottom: 8, fontWeight: 500 }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          width: "100%", padding: "12px 14px", border: `1px solid ${T.border}`,
          background: T.bg, fontFamily: F.body, fontSize: 14, color: T.text,
          appearance: "none", cursor: "pointer", outline: "none",
        }}>
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{
          width: "100%", padding: "12px 14px", border: `1px solid ${T.border}`,
          background: T.bg, fontFamily: F.body, fontSize: 14, color: T.text, outline: "none",
          boxSizing: "border-box", resize: "vertical",
        }} />
      ) : (
        <div style={{ position: "relative" }}>
          <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""} style={{
            width: "100%", padding: "12px 14px", border: `1px solid ${T.border}`,
            background: T.bg, fontFamily: F.body, fontSize: 14, color: T.text,
            outline: "none", boxSizing: "border-box",
          }} />
          {suffix && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: F.body, fontSize: 12, color: T.textMuted }}>{suffix}</span>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// VALUATION CALCULATOR
// ═══════════════════════════════════════════════════════
function ValuationCalculator() {
  const [form, setForm] = useState({
    revenue: "", ebitda: "", industry: "", country: "", employees: "",
    concentration: "", ownership: "", timeline: "",
  });
  const [result, setResult] = useState(null);

  const industries = ["Manufacturing", "Engineering Services", "Industrial Technology", "Energy & Infrastructure", "Defense & Aerospace", "MedTech", "Construction & Materials", "Other Industrial"];
  const countries = ["Germany", "Austria", "Switzerland", "Netherlands", "France", "Other EU"];

  const calculate = () => {
    const rev = parseFloat(form.revenue) || 0;
    const ebt = parseFloat(form.ebitda) || 0;
    if (rev === 0) return;
    const margin = rev > 0 ? (ebt / rev) * 100 : 0;
    let revMul = 0.8, ebitdaMul = 5.5;
    if (["Manufacturing", "Engineering Services", "Industrial Technology"].includes(form.industry)) { revMul = 1.0; ebitdaMul = 6.5; }
    if (["Defense & Aerospace", "MedTech"].includes(form.industry)) { revMul = 1.2; ebitdaMul = 7.5; }
    if (["Germany", "Switzerland"].includes(form.country)) { revMul *= 1.1; ebitdaMul *= 1.1; }
    if (margin > 15) ebitdaMul *= 1.15;
    if (parseInt(form.concentration) > 50) { ebitdaMul *= 0.85; revMul *= 0.9; }
    const revBased = rev * revMul;
    const ebitdaBased = ebt > 0 ? ebt * ebitdaMul : revBased;
    const mid = (revBased + ebitdaBased) / 2;
    setResult({ low: (mid * 0.75).toFixed(1), mid: mid.toFixed(1), high: (mid * 1.35).toFixed(1), revMul: revMul.toFixed(1), ebitdaMul: ebitdaMul.toFixed(1) });
  };

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px" }}>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Tool</div>
      <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 8px" }}>Valuation Estimator</h3>
      <p style={{ fontFamily: F.body, fontSize: 13, color: T.textMuted, margin: "0 0 32px", lineHeight: 1.6 }}>Indicative enterprise value range. All data is confidential and processed locally.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
        <Field label="Annual Revenue (€M)" value={form.revenue} onChange={v => setForm({...form, revenue: v})} suffix="€M" half />
        <Field label="EBITDA (€M)" value={form.ebitda} onChange={v => setForm({...form, ebitda: v})} suffix="€M" half />
        <Field label="Industry Sector" value={form.industry} onChange={v => setForm({...form, industry: v})} options={industries} half />
        <Field label="Country" value={form.country} onChange={v => setForm({...form, country: v})} options={countries} half />
        <Field label="Employees" value={form.employees} onChange={v => setForm({...form, employees: v})} half />
        <Field label="Top 3 Customer Concentration (%)" value={form.concentration} onChange={v => setForm({...form, concentration: v})} suffix="%" half />
        <Field label="Ownership Structure" value={form.ownership} onChange={v => setForm({...form, ownership: v})} options={["Sole founder", "Family-owned", "Partnership", "Other"]} half />
        <Field label="Exit Timeline" value={form.timeline} onChange={v => setForm({...form, timeline: v})} options={["< 1 year", "1-2 years", "2-5 years", "Exploring options"]} half />
      </div>

      <button onClick={calculate} style={{
        background: T.surfaceDark, color: T.white, border: "none",
        padding: "13px 32px", fontFamily: F.body, fontSize: 13, cursor: "pointer", width: "100%",
      }}>
        Calculate indicative range
      </button>

      {result && (
        <div style={{ marginTop: 32, padding: "32px 0 0", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Indicative Enterprise Value</div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted }}>€{result.low}M</span>
              <span style={{ fontFamily: F.display, fontSize: 28, color: T.text }}>€{result.mid}M</span>
              <span style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted }}>€{result.high}M</span>
            </div>
            <div style={{ height: 8, background: T.bgAlt, position: "relative" }}>
              <div style={{ position: "absolute", left: "15%", right: "15%", top: 0, bottom: 0, background: T.accent, opacity: 0.15 }} />
              <div style={{ position: "absolute", left: "50%", top: -4, width: 3, height: 16, background: T.accent, transform: "translateX(-50%)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontFamily: F.body, fontSize: 10, color: T.textMuted }}>Conservative</span>
              <span style={{ fontFamily: F.body, fontSize: 10, color: T.textMuted }}>Optimistic</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border }}>
            <div style={{ background: T.surface, padding: "16px 20px" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Revenue multiple</div>
              <div style={{ fontFamily: F.display, fontSize: 18, color: T.text }}>{result.revMul}×</div>
            </div>
            <div style={{ background: T.surface, padding: "16px 20px" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, marginBottom: 4 }}>EBITDA multiple</div>
              <div style={{ fontFamily: F.display, fontSize: 18, color: T.text }}>{result.ebitdaMul}×</div>
            </div>
          </div>
          <p style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, marginTop: 20, lineHeight: 1.6 }}>
            Indicative estimate based on comparable transactions. For a detailed confidential assessment, schedule a conversation with our team.
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SUCCESSION READINESS DIAGNOSTIC
// ═══════════════════════════════════════════════════════
function ReadinessDiagnostic({ setPage }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const sections = [
    {
      title: "Succession & Leadership", weight: 0.30, icon: "01",
      questions: [
        { id: "s1", q: "Is there an identified successor or leadership transition plan?", opts: ["Yes, formally documented", "Informally discussed", "Under consideration", "No plan exists"] },
        { id: "s2", q: "How dependent is the business on the founder for daily operations?", opts: ["Minimal — runs independently", "Moderate — involved weekly", "High — involved daily", "Critical — cannot operate without"] },
        { id: "s3", q: "Is there a management team capable of running the business independently?", opts: ["Yes, proven and tested", "Partially — some gaps", "Nascent team in place", "No independent management"] },
      ],
    },
    {
      title: "Financial Clarity", weight: 0.20, icon: "02",
      questions: [
        { id: "f1", q: "Are audited or reviewed financial statements available for the last 3 years?", opts: ["Audited financials available", "Reviewed financials available", "Internal financials only", "Incomplete records"] },
        { id: "f2", q: "Is there a clear separation between personal and business finances?", opts: ["Fully separated", "Mostly separated", "Partially mixed", "Significantly intermingled"] },
        { id: "f3", q: "How predictable is revenue over the next 12–24 months?", opts: ["Highly predictable (contracts/recurring)", "Mostly predictable", "Somewhat variable", "Highly unpredictable"] },
      ],
    },
    {
      title: "Customer Concentration", weight: 0.20, icon: "03",
      questions: [
        { id: "c1", q: "What percentage of revenue comes from your top 3 customers?", opts: ["Less than 25%", "25–40%", "40–60%", "More than 60%"] },
        { id: "c2", q: "Are key customer relationships dependent on the founder personally?", opts: ["No — managed by team", "Partially", "Mostly founder-dependent", "Entirely founder-dependent"] },
        { id: "c3", q: "How diversified is your customer base by sector and geography?", opts: ["Well diversified", "Moderately diversified", "Somewhat concentrated", "Highly concentrated"] },
      ],
    },
    {
      title: "Operational Maturity", weight: 0.20, icon: "04",
      questions: [
        { id: "o1", q: "Are core business processes documented and standardized?", opts: ["Fully documented", "Mostly documented", "Partially documented", "Undocumented / tribal knowledge"] },
        { id: "o2", q: "What is the level of technology and digital infrastructure?", opts: ["Modern ERP/systems in place", "Basic digital tools", "Mostly manual processes", "Minimal technology use"] },
        { id: "o3", q: "How resilient are your supply chain and vendor relationships?", opts: ["Diversified and robust", "Adequate with some risks", "Concentrated but stable", "Fragile or single-source"] },
      ],
    },
    {
      title: "Compliance & Risk", weight: 0.10, icon: "05",
      questions: [
        { id: "r1", q: "Are all regulatory and compliance requirements currently met?", opts: ["Fully compliant", "Mostly compliant", "Some gaps identified", "Significant compliance issues"] },
        { id: "r2", q: "Is there adequate insurance and legal protection in place?", opts: ["Comprehensive coverage", "Standard coverage", "Basic coverage", "Insufficient coverage"] },
      ],
    },
  ];

  const handleAnswer = (qId, optIndex) => setAnswers({ ...answers, [qId]: optIndex });

  const calculateScore = () => {
    let totalScore = 0;
    const sectionScores = [];
    const risks = [];
    sections.forEach(section => {
      let sectionTotal = 0;
      section.questions.forEach(q => {
        const ans = answers[q.id];
        const score = ans !== undefined ? (3 - ans) / 3 * 100 : 0;
        sectionTotal += score;
        if (score <= 33) risks.push({ section: section.title, question: q.q, severity: score === 0 ? "Critical" : "High" });
      });
      const avg = sectionTotal / section.questions.length;
      sectionScores.push({ title: section.title, score: avg, weight: section.weight });
      totalScore += avg * section.weight;
    });
    return { totalScore: Math.round(totalScore), sectionScores, risks: risks.slice(0, 3) };
  };

  // Intro
  if (step === 0) {
    return (
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px", marginTop: 48 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Diagnostic</div>
        <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 8px" }}>Succession Readiness Assessment</h3>
        <p style={{ fontFamily: F.body, fontSize: 13, color: T.textMuted, margin: "0 0 28px", lineHeight: 1.6 }}>
          A structured diagnostic across 5 dimensions of institutional readiness. Takes approximately 5 minutes. Your responses are confidential and produce an immediate readiness score.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: T.border, marginBottom: 32 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ background: T.bg, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: T.textMuted, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: T.text, fontWeight: 500, lineHeight: 1.4 }}>{s.title}</div>
              <div style={{ fontFamily: F.body, fontSize: 10, color: T.textMuted, marginTop: 4 }}>{Math.round(s.weight * 100)}%</div>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(1)} style={{
          background: T.surfaceDark, color: T.white, border: "none",
          padding: "13px 32px", fontFamily: F.body, fontSize: 13, cursor: "pointer", width: "100%",
        }}>
          Begin assessment
        </button>
      </div>
    );
  }

  // Questions
  if (step >= 1 && step <= 5) {
    const section = sections[step - 1];
    const sectionComplete = section.questions.every(q => answers[q.id] !== undefined);

    return (
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px", marginTop: 48 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
          {sections.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, background: i < step ? T.accent : i === step - 1 ? T.accentLight : T.border, transition: "background 0.3s" }} />
          ))}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Section {step} of 5</div>
        <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: T.text, margin: "0 0 32px" }}>{section.title}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {section.questions.map(q => (
            <div key={q.id}>
              <div style={{ fontFamily: F.body, fontSize: 14, color: T.text, marginBottom: 14, lineHeight: 1.5, fontWeight: 500 }}>{q.q}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => handleAnswer(q.id, oi)} style={{
                    background: answers[q.id] === oi ? T.surfaceDark : T.bg,
                    border: `1px solid ${answers[q.id] === oi ? T.surfaceDark : T.border}`,
                    padding: "12px 18px", cursor: "pointer", textAlign: "left",
                    fontFamily: F.body, fontSize: 13,
                    color: answers[q.id] === oi ? T.white : T.text,
                    transition: "all 0.15s",
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
          <button onClick={() => setStep(step - 1)} style={{
            background: "none", border: `1px solid ${T.border}`, padding: "11px 24px",
            fontFamily: F.body, fontSize: 13, cursor: "pointer", color: T.textSecondary,
          }}>← Back</button>
          <button onClick={() => sectionComplete && setStep(step + 1)} style={{
            background: sectionComplete ? T.surfaceDark : T.border,
            color: sectionComplete ? T.white : T.textMuted,
            border: "none", padding: "11px 24px", fontFamily: F.body, fontSize: 13,
            cursor: sectionComplete ? "pointer" : "default",
          }}>
            {step === 5 ? "View results" : "Continue →"}
          </button>
        </div>
      </div>
    );
  }

  // Results
  if (step === 6) {
    const { totalScore, sectionScores, risks } = calculateScore();
    const label = totalScore >= 75 ? "Institutionally Ready" : totalScore >= 50 ? "Emerging Readiness" : totalScore >= 25 ? "Significant Gaps" : "Pre-Institutional";
    const labelColor = totalScore >= 75 ? T.success : totalScore >= 50 ? T.accent : totalScore >= 25 ? "#8B6914" : T.error;

    return (
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px", marginTop: 48 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Assessment Complete</div>
        <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 32px" }}>Succession Readiness Results</h3>

        <div style={{ textAlign: "center", padding: "32px 0", marginBottom: 32, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: F.display, fontSize: 72, color: T.text, lineHeight: 1 }}>{totalScore}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted, marginTop: 4 }}>out of 100</div>
          <div style={{ display: "inline-block", marginTop: 16, padding: "6px 16px", border: `1px solid ${labelColor}`, fontFamily: F.mono, fontSize: 11, color: labelColor, letterSpacing: 1, textTransform: "uppercase" }}>
            {label}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Breakdown by dimension</div>
          {sectionScores.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ fontFamily: F.body, fontSize: 13, color: T.text, width: 180, flexShrink: 0 }}>{s.title}</div>
              <div style={{ flex: 1, height: 6, background: T.bgAlt, position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${s.score}%`, background: s.score >= 66 ? T.accent : s.score >= 33 ? "#8B6914" : T.error, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: T.text, width: 40, textAlign: "right" }}>{Math.round(s.score)}</div>
            </div>
          ))}
        </div>

        {risks.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Top risks identified</div>
            {risks.map((r, i) => (
              <div key={i} style={{ padding: "16px 20px", background: T.bg, marginBottom: 8, borderLeft: `3px solid ${r.severity === "Critical" ? T.error : "#8B6914"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: F.body, fontSize: 12, color: T.text, fontWeight: 600 }}>{r.section}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: r.severity === "Critical" ? T.error : "#8B6914", textTransform: "uppercase", letterSpacing: 1 }}>{r.severity}</span>
                </div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>{r.question}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Recommended next steps</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border }}>
            <div style={{ background: T.bg, padding: "20px" }}>
              <div style={{ fontFamily: F.body, fontSize: 13, color: T.text, fontWeight: 600, marginBottom: 6 }}>Confidential conversation</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>Discuss results with a Vinea principal. Understand your options and realistic timeline.</div>
            </div>
            <div style={{ background: T.bg, padding: "20px" }}>
              <div style={{ fontFamily: F.body, fontSize: 13, color: T.text, fontWeight: 600, marginBottom: 6 }}>Institutional readiness plan</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>Receive a tailored action plan to improve your score before going to market.</div>
            </div>
          </div>
        </div>

        <button onClick={() => setPage("contact")} style={{
          background: T.surfaceDark, color: T.white, border: "none",
          padding: "14px 32px", fontFamily: F.body, fontSize: 14, cursor: "pointer", width: "100%",
        }}>
          Schedule a confidential call
        </button>
        <p style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, textAlign: "center", marginTop: 16 }}>
          All assessment data is confidential and covered by our standard NDA.
        </p>
      </div>
    );
  }
  return null;
}

// ═══════════════════════════════════════════════════════
// FOUNDERS PAGE
// ═══════════════════════════════════════════════════════
function FoundersPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 64 }}>
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>For Founders & Sellers</div>
        <h1 style={{ fontFamily: F.display, fontSize: 42, fontWeight: 400, color: T.text, lineHeight: 1.2, margin: "0 0 20px" }}>
          Your company deserves a future<br />as strong as its past.
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, margin: "0 0 20px" }}>
          You built something real. When the time comes to step back, you need a partner who understands industrial businesses — not a broker looking for a quick transaction. Vinea transforms founder-owned companies into institutionally managed platforms, preserving legacy while unlocking value.
        </p>
        <p style={{ fontFamily: F.body, fontSize: 13, color: T.textMuted, lineHeight: 1.6, maxWidth: 500, margin: "0 0 64px" }}>
          Start by understanding where you stand. Both tools below are confidential, require no account, and give you immediate results.
        </p>

        <ValuationCalculator />
        <ReadinessDiagnostic setPage={setPage} />

        <div style={{ marginTop: 48, padding: "32px 40px", background: T.surfaceDark }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Confidentiality</div>
          <p style={{ fontFamily: F.body, fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: 0 }}>
            Every interaction with Vinea is confidential from the first conversation. We operate under institutional-grade data protection standards. No information is shared without your explicit written consent.
          </p>
        </div>

        <div style={{ marginTop: 48, textAlign: "center", padding: "48px 0" }}>
          <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 16px" }}>Ready to explore your options?</h3>
          <p style={{ fontFamily: F.body, fontSize: 14, color: T.textSecondary, margin: "0 0 28px" }}>Schedule a private, no-obligation conversation with a Vinea principal.</p>
          <button onClick={() => setPage("contact")} style={{
            background: T.surfaceDark, color: T.white, border: "none",
            padding: "14px 36px", fontFamily: F.body, fontSize: 14, cursor: "pointer",
          }}>
            Schedule a confidential conversation
          </button>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// BUYERS PAGE
// ═══════════════════════════════════════════════════════
function BuyersPage({ setPage }) {
  const [form, setForm] = useState({ entity: "", type: "", sectors: [], geography: "", revMin: "", revMax: "", preference: "", timeline: "", involvement: "", contact: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const sectorList = ["Precision Manufacturing", "Energy & Infrastructure", "Defense & Aerospace", "MedTech & Photonics", "Industrial Technology", "Circular Economy", "Advanced Materials"];
  const toggleSector = (s) => setForm(f => ({ ...f, sectors: f.sectors.includes(s) ? f.sectors.filter(x => x !== s) : [...f.sectors, s] }));

  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 64 }}>
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>For Investors</div>
        <h1 style={{ fontFamily: F.display, fontSize: 42, fontWeight: 400, color: T.text, lineHeight: 1.2, margin: "0 0 20px" }}>
          Structured access to<br />European industrial SMEs.
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, margin: "0 0 56px" }}>
          Vinea packages pre-institutional SMEs into clustered investment platforms — de-risked, operationally improved, and structured for institutional buyers.
        </p>

        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Active Clusters</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: T.border }}>
            {[
              { name: "Energy, Infrastructure & Circular Economy", deals: 9, value: "Growing", exits: "€50M+" },
              { name: "Defense, MedTech & Photonics", deals: 9, value: "Growing", exits: "€15M+" },
              { name: "Precision Mfg, Tooling & Materials", deals: 20, value: "€102M", exits: "€50M+" },
            ].map((c, i) => (
              <div key={i} style={{ background: T.surface, padding: "28px 24px" }}>
                <div style={{ fontFamily: F.body, fontSize: 14, color: T.text, fontWeight: 600, marginBottom: 16, lineHeight: 1.4 }}>{c.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div><span style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted }}>Deals: </span><span style={{ fontFamily: F.mono, fontSize: 12, color: T.text }}>{c.deals}</span></div>
                  <div><span style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted }}>Pipeline: </span><span style={{ fontFamily: F.mono, fontSize: 12, color: T.text }}>{c.value}</span></div>
                  <div><span style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted }}>Exit potential: </span><span style={{ fontFamily: F.mono, fontSize: 12, color: T.text }}>{c.exits}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!submitted ? (
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px" }}>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Investor Registration</div>
            <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 32px" }}>Register Acquisition Criteria</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
              <Field label="Fund / Entity Name" value={form.entity} onChange={v => setForm({...form, entity: v})} half />
              <Field label="Investor Type" value={form.type} onChange={v => setForm({...form, type: v})} options={["Private Equity", "Family Office", "Strategic / Corporate", "Holding Company", "Other"]} half />
              <Field label="Geography" value={form.geography} onChange={v => setForm({...form, geography: v})} options={["DACH only", "DACH + Benelux", "EU-wide", "Specific countries"]} half />
              <Field label="Platform vs Bolt-on" value={form.preference} onChange={v => setForm({...form, preference: v})} options={["Platform acquisitions", "Bolt-on / Add-on", "Both"]} half />
              <Field label="Revenue Range Min (€M)" value={form.revMin} onChange={v => setForm({...form, revMin: v})} placeholder="e.g. 2" half />
              <Field label="Revenue Range Max (€M)" value={form.revMax} onChange={v => setForm({...form, revMax: v})} placeholder="e.g. 20" half />
              <Field label="Timeline" value={form.timeline} onChange={v => setForm({...form, timeline: v})} options={["Actively deploying", "Within 6 months", "Within 12 months", "Exploring"]} half />
              <Field label="Operational Involvement" value={form.involvement} onChange={v => setForm({...form, involvement: v})} options={["Active — hands-on", "Board-level oversight", "Passive — financial only"]} half />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontFamily: F.body, fontSize: 12, color: T.textSecondary, marginBottom: 12, fontWeight: 500 }}>Sector Focus</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sectorList.map(s => (
                  <button key={s} onClick={() => toggleSector(s)} style={{
                    background: form.sectors.includes(s) ? T.surfaceDark : T.bg,
                    color: form.sectors.includes(s) ? T.white : T.text,
                    border: `1px solid ${form.sectors.includes(s) ? T.surfaceDark : T.border}`,
                    padding: "8px 16px", fontFamily: F.body, fontSize: 12, cursor: "pointer",
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
              <Field label="Contact Name" value={form.contact} onChange={v => setForm({...form, contact: v})} half />
              <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} half />
            </div>
            <button onClick={() => setSubmitted(true)} style={{
              background: T.surfaceDark, color: T.white, border: "none",
              padding: "14px 32px", fontFamily: F.body, fontSize: 14, cursor: "pointer", width: "100%",
            }}>Submit criteria & request deal flow</button>
          </div>
        ) : (
          <div style={{ background: T.surface, border: `1px solid ${T.accent}`, padding: "48px 44px", textAlign: "center" }}>
            <div style={{ fontFamily: F.display, fontSize: 24, color: T.text, marginBottom: 12 }}>Criteria received.</div>
            <p style={{ fontFamily: F.body, fontSize: 14, color: T.textSecondary }}>Our team will follow up within 48 hours with relevant cluster data. All communications are confidential.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PARTNERS PAGE
// ═══════════════════════════════════════════════════════
function PartnersPage({ setPage }) {
  const [mode, setMode] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dealForm, setDealForm] = useState({ yourName: "", firm: "", companyName: "", sector: "", revenue: "", ebitda: "", founderAge: "", location: "", description: "", relationship: "" });
  const [partnerForm, setPartnerForm] = useState({ firmName: "", type: "", region: "", sectors: "", dealsPerYear: "", contact: "", email: "" });

  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 64 }}>
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>For Partners & Intermediaries</div>
        <h1 style={{ fontFamily: F.display, fontSize: 42, fontWeight: 400, color: T.text, lineHeight: 1.2, margin: "0 0 20px" }}>
          Turn your deal flow into<br />institutional outcomes.
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: T.textSecondary, lineHeight: 1.7, maxWidth: 600, margin: "0 0 56px" }}>
          Vinea works with M&A advisors, brokers, banks, and legal firms. Submit a specific deal or become an ongoing sourcing partner with structured economics.
        </p>

        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Partnership Models</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border }}>
            {[
              { model: "Referral Partner", desc: "Submit deals for a referral fee. Minimal involvement after introduction.", econ: "Referral fee on close" },
              { model: "Co-Mandate Partner", desc: "Joint advisory mandate. Shared underwriting and client management.", econ: "Shared advisory fee" },
              { model: "Embedded Partner", desc: "Dedicated sourcing relationship. Priority pipeline access.", econ: "Retainer + success fee" },
              { model: "White-Label Partner", desc: "Use Vinea's underwriting and platform under your brand.", econ: "Custom economics" },
            ].map((p, i) => (
              <div key={i} style={{ background: T.surface, padding: "28px 24px" }}>
                <div style={{ fontFamily: F.body, fontSize: 15, color: T.text, fontWeight: 600, marginBottom: 8 }}>{p.model}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: T.accent }}>{p.econ}</div>
              </div>
            ))}
          </div>
        </div>

        {!mode && !submitted && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <button onClick={() => setMode("deal")} style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "32px 28px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontFamily: F.body, fontSize: 16, color: T.text, fontWeight: 600, marginBottom: 8 }}>Submit a deal</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary, lineHeight: 1.5 }}>You have a specific company in mind. Takes under 2 minutes.</div>
            </button>
            <button onClick={() => setMode("partner")} style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "32px 28px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontFamily: F.body, fontSize: 16, color: T.text, fontWeight: 600, marginBottom: 8 }}>Become a sourcing partner</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary, lineHeight: 1.5 }}>Ongoing relationship to source and refer deals.</div>
            </button>
          </div>
        )}

        {mode === "deal" && !submitted && (
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Deal Submission</div>
                <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: T.text, margin: 0 }}>Submit a company</h3>
              </div>
              <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.body, fontSize: 12, color: T.textMuted }}>← Back</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 20 }}>
              <Field label="Your Name" value={dealForm.yourName} onChange={v => setDealForm({...dealForm, yourName: v})} half />
              <Field label="Your Firm" value={dealForm.firm} onChange={v => setDealForm({...dealForm, firm: v})} half />
              <Field label="Company Name (optional)" value={dealForm.companyName} onChange={v => setDealForm({...dealForm, companyName: v})} placeholder="Can be disclosed later" half />
              <Field label="Sector" value={dealForm.sector} onChange={v => setDealForm({...dealForm, sector: v})} options={["Manufacturing", "Engineering", "Energy", "Defense", "MedTech", "Technology", "Other"]} half />
              <Field label="Revenue (€M)" value={dealForm.revenue} onChange={v => setDealForm({...dealForm, revenue: v})} half />
              <Field label="EBITDA (€M)" value={dealForm.ebitda} onChange={v => setDealForm({...dealForm, ebitda: v})} half />
              <Field label="Founder Age / Status" value={dealForm.founderAge} onChange={v => setDealForm({...dealForm, founderAge: v})} placeholder="e.g. 67, actively seeking" half />
              <Field label="Location" value={dealForm.location} onChange={v => setDealForm({...dealForm, location: v})} half />
              <Field label="Relationship" value={dealForm.relationship} onChange={v => setDealForm({...dealForm, relationship: v})} options={["Warm — active relationship", "Introduced — early stage", "Cold — identified only", "Exclusive mandate"]} half />
            </div>
            <div style={{ marginBottom: 28 }}>
              <Field label="Brief Description" value={dealForm.description} onChange={v => setDealForm({...dealForm, description: v})} multiline placeholder="What makes this company interesting?" />
            </div>
            <button onClick={() => setSubmitted(true)} style={{ background: T.surfaceDark, color: T.white, border: "none", padding: "14px 32px", fontFamily: F.body, fontSize: 14, cursor: "pointer", width: "100%" }}>
              Submit for review
            </button>
          </div>
        )}

        {mode === "partner" && !submitted && (
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Partner Application</div>
                <h3 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 400, color: T.text, margin: 0 }}>Become a sourcing partner</h3>
              </div>
              <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.body, fontSize: 12, color: T.textMuted }}>← Back</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
              <Field label="Firm Name" value={partnerForm.firmName} onChange={v => setPartnerForm({...partnerForm, firmName: v})} half />
              <Field label="Type" value={partnerForm.type} onChange={v => setPartnerForm({...partnerForm, type: v})} options={["M&A Advisory", "Business Broker", "Bank", "Legal Firm", "Accounting Firm", "Operator", "Other"]} half />
              <Field label="Geographic Coverage" value={partnerForm.region} onChange={v => setPartnerForm({...partnerForm, region: v})} options={["Germany", "DACH", "Benelux", "Nordics", "Southern Europe", "EU-wide"]} half />
              <Field label="Sector Specialization" value={partnerForm.sectors} onChange={v => setPartnerForm({...partnerForm, sectors: v})} placeholder="e.g. Industrial manufacturing" half />
              <Field label="Deals Per Year" value={partnerForm.dealsPerYear} onChange={v => setPartnerForm({...partnerForm, dealsPerYear: v})} options={["1-5", "5-15", "15-30", "30+"]} half />
              <Field label="Contact Name" value={partnerForm.contact} onChange={v => setPartnerForm({...partnerForm, contact: v})} half />
              <Field label="Email" value={partnerForm.email} onChange={v => setPartnerForm({...partnerForm, email: v})} half />
            </div>
            <button onClick={() => setSubmitted(true)} style={{ background: T.surfaceDark, color: T.white, border: "none", padding: "14px 32px", fontFamily: F.body, fontSize: 14, cursor: "pointer", width: "100%" }}>
              Submit application
            </button>
          </div>
        )}

        {submitted && (
          <div style={{ background: T.surface, border: `1px solid ${T.accent}`, padding: "48px 44px", textAlign: "center" }}>
            <div style={{ fontFamily: F.display, fontSize: 24, color: T.text, marginBottom: 12 }}>{mode === "deal" ? "Deal submitted." : "Application received."}</div>
            <p style={{ fontFamily: F.body, fontSize: 14, color: T.textSecondary }}>{mode === "deal" ? "Our underwriting team will review within 5 business days." : "We'll follow up within 48 hours."}</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PLATFORM PAGE
// ═══════════════════════════════════════════════════════
function PlatformPage() {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 64 }}>
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>The Vinea Model</div>
        <h1 style={{ fontFamily: F.display, fontSize: 42, fontWeight: 400, color: T.text, lineHeight: 1.2, margin: "0 0 20px" }}>
          An operating system for<br />industrial succession.
        </h1>
        <p style={{ fontFamily: F.body, fontSize: 16, color: T.textSecondary, lineHeight: 1.7, maxWidth: 620, margin: "0 0 64px" }}>
          Vinea is not a broker, not a fund, and not a search firm. It's an institutional platform that converts pre-institutional SMEs into structured investment platforms using AI-powered infrastructure.
        </p>

        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>VinOS — Platform Infrastructure</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border }}>
            {[
              { engine: "AI Deal Engine", desc: "Outbound sourcing and qualification. 121 deals sourced, €580M pipeline value." },
              { engine: "AI Underwriting Engine", desc: "1,000+ parameter model for risk scoring, founder profiling, cluster mapping, and valuation." },
              { engine: "AI Operating Engine", desc: "Malleable software that moulds to the business. Governance, digitization, transformation." },
              { engine: "Managed Marketplace", desc: "PE, strategics, and family offices select from clustered, de-risked SME cohorts." },
            ].map((e, i) => (
              <div key={i} style={{ background: T.surface, padding: "32px 28px" }}>
                <div style={{ fontFamily: F.body, fontSize: 16, color: T.text, fontWeight: 600, marginBottom: 10 }}>{e.engine}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Competitive Positioning</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, background: T.border }}>
            {[
              { player: "Private Equity", entry: "Already institutionalized companies", miss: "SMEs too small, too opaque, too much work" },
              { player: "Search Funds", entry: "One stable, owner-led business", miss: "Single-asset, operator-dependent, no platform" },
              { player: "Roll-Ups", entry: "Fragmented but stable players", miss: "Integration-heavy, no risk standardization" },
              { player: "Vinea", entry: "Founder-dependent, pre-institutional SMEs", miss: "System-driven risk conversion at scale", hl: true },
            ].map((r, i) => (
              <div key={i} style={{
                background: r.hl ? T.surfaceDark : T.surface, padding: "20px 28px",
                display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 24, alignItems: "center",
              }}>
                <div style={{ fontFamily: F.body, fontSize: 14, color: r.hl ? T.white : T.text, fontWeight: 600 }}>{r.player}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: r.hl ? "rgba(255,255,255,0.7)" : T.textSecondary }}>{r.entry}</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: r.hl ? "rgba(255,255,255,0.7)" : T.textMuted }}>{r.miss}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "40px 44px" }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Case Study</div>
          <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 28px" }}>Spectrum Elektrotechnik GmbH</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Before — At Takeover</div>
              {[
                { m: "Revenue", v: "€30K (collapsed from €3.5M)" }, { m: "EBITDA", v: "10%" },
                { m: "Customers", v: "5 active" }, { m: "Employees", v: "7-8 FTE (from 60-70)" },
              ].map((x, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary }}>{x.m}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 13, color: T.text }}>{x.v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: T.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>After — 10 Months</div>
              {[
                { m: "Revenue", v: "~2× vs. peak" }, { m: "EBITDA", v: "40%" },
                { m: "Customers", v: "120+" }, { m: "Employees", v: "30 FTE" },
              ].map((x, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: F.body, fontSize: 13, color: T.textSecondary }}>{x.m}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 13, color: T.accent }}>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, paddingTop: 64 }}>
      <section style={{ padding: "80px 40px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
        <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 400, color: T.text, margin: "0 0 16px" }}>Start a conversation.</h1>
        <p style={{ fontFamily: F.body, fontSize: 15, color: T.textSecondary, lineHeight: 1.7, margin: "0 0 48px" }}>
          Every conversation begins confidentially. Tell us who you are and what you're looking for.
        </p>

        {!sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 20 }}>
              <Field label="Name" value={form.name} onChange={v => setForm({...form, name: v})} half />
              <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} half />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: F.body, fontSize: 12, color: T.textSecondary, marginBottom: 12, fontWeight: 500 }}>I am a...</label>
              <div style={{ display: "flex", gap: 12 }}>
                {["Founder / Seller", "Investor", "Partner", "Other"].map(t => (
                  <button key={t} onClick={() => setForm({...form, type: t})} style={{
                    background: form.type === t ? T.surfaceDark : T.surface,
                    color: form.type === t ? T.white : T.text,
                    border: `1px solid ${form.type === t ? T.surfaceDark : T.border}`,
                    padding: "10px 18px", fontFamily: F.body, fontSize: 13, cursor: "pointer",
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <Field label="Message" value={form.message} onChange={v => setForm({...form, message: v})} multiline placeholder="Tell us what you're looking for..." />
            <button onClick={() => setSent(true)} style={{
              background: T.surfaceDark, color: T.white, border: "none",
              padding: "14px 32px", fontFamily: F.body, fontSize: 14, cursor: "pointer",
            }}>Send message</button>
            <p style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, margin: 0 }}>All communications are confidential.</p>
          </div>
        ) : (
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <div style={{ fontFamily: F.display, fontSize: 24, color: T.text, marginBottom: 12 }}>Message sent.</div>
            <p style={{ fontFamily: F.body, fontSize: 14, color: T.textSecondary }}>We'll respond within 24 hours. All communications are confidential.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FLOATING CHAT
// ═══════════════════════════════════════════════════════
function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "vinea", text: "Welcome to Vinea. How can we help you today?" }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { from: "vinea", text: "Thank you. A member of our team will follow up directly. In the meantime, explore our founder, investor, or partner resources above." }]);
    }, 1000);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        width: 48, height: 48, background: T.surfaceDark, border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}>
        <span style={{ color: T.white, fontSize: 16, fontFamily: F.mono }}>?</span>
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      width: 340, height: 420, background: T.surface,
      border: `1px solid ${T.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>Vinea</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: T.text, fontWeight: 500 }}>Confidential conversation</div>
        </div>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: T.textMuted }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px",
              background: m.from === "user" ? T.surfaceDark : T.bgAlt,
              color: m.from === "user" ? T.white : T.text,
              fontFamily: F.body, fontSize: 13, lineHeight: 1.5,
            }}>{m.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{
          flex: 1, padding: "10px 12px", border: `1px solid ${T.border}`,
          background: T.bg, fontFamily: F.body, fontSize: 13, color: T.text, outline: "none",
        }} />
        <button onClick={send} style={{ background: T.surfaceDark, color: T.white, border: "none", padding: "10px 14px", fontFamily: F.body, fontSize: 12, cursor: "pointer" }}>→</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, padding: "48px 40px", background: T.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, letterSpacing: 4, color: T.text, textTransform: "uppercase", marginBottom: 12 }}>Vinea</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: T.textMuted, lineHeight: 1.6, maxWidth: 280 }}>
            Transforming European SMEs into a new asset class. All interactions are confidential.
          </div>
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          {[
            { title: "Platform", links: [["Founders", "founders"], ["Investors", "buyers"], ["Partners", "partners"], ["The Model", "platform"]] },
            { title: "Company", links: [["Contact", "contact"], ["Confidentiality", "contact"], ["Impressum", "contact"]] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>{col.title}</div>
              {col.links.map(([label, pg], j) => (
                <button key={j} onClick={() => setPage(pg)} style={{
                  display: "block", background: "none", border: "none", cursor: "pointer",
                  fontFamily: F.body, fontSize: 13, color: T.textSecondary, padding: "4px 0", textAlign: "left",
                }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: F.body, fontSize: 11, color: T.textMuted }}>© 2026 Vinea Ventures. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════
export default function VineaPlatform() {
  const [page, setPage] = useState("home");
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderPage = () => {
    switch (page) {
      case "home": return <Landing setPage={navigate} />;
      case "founders": return <FoundersPage setPage={navigate} />;
      case "buyers": return <BuyersPage setPage={navigate} />;
      case "partners": return <PartnersPage setPage={navigate} />;
      case "platform": return <PlatformPage />;
      case "contact": return <ContactPage />;
      default: return <Landing setPage={navigate} />;
    }
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${T.bg}; }
        ::selection { background: ${T.accent}; color: white; }
        input::placeholder, textarea::placeholder { color: ${T.textMuted}; }
        button:active { transform: scale(0.98); }
      `}</style>
      <Nav page={page} setPage={navigate} />
      <div key={page}>{renderPage()}</div>
      <Footer setPage={navigate} />
      <FloatingChat />
    </div>
  );
}
