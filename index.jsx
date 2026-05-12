import { useState, useEffect, useRef } from "react";

const BG = "#fdf6de";
const ACCENT = "#fdc92e";
const TEXT = "#080929";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Mynerve&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${BG};
    color: ${TEXT};
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: ${BG}; }
  ::-webkit-scrollbar-thumb { background: ${ACCENT}; }

  .cursor {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${ACCENT};
    position: fixed;
    pointer-events: none;
    z-index: 99999;
    transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
    mix-blend-mode: multiply;
  }

  .cursor-ring {
    width: 36px; height: 36px;
    border: 1.5px solid ${TEXT};
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 99998;
    transition: transform 0.15s ease, width 0.25s ease, height 0.25s ease, border-color 0.2s;
  }

  .headline {
    font-family: 'Times New Roman', serif;
    font-style: italic;
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .accent-font {
    font-family: 'Mynerve', cursive;
  }

  .nav-link {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${TEXT};
    text-decoration: none;
    transition: color 0.2s;
    cursor: none;
  }
  .nav-link:hover { color: ${ACCENT}; }

  .btn-primary {
    background: ${TEXT};
    color: ${BG};
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 16px 36px;
    border: none;
    cursor: none;
    transition: background 0.25s, color 0.25s, transform 0.2s;
    display: inline-block;
    text-decoration: none;
  }
  .btn-primary:hover {
    background: ${ACCENT};
    color: ${TEXT};
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    color: ${TEXT};
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 15px 36px;
    border: 1.5px solid ${TEXT};
    cursor: none;
    transition: background 0.25s, color 0.25s, transform 0.2s;
    display: inline-block;
    text-decoration: none;
  }
  .btn-outline:hover {
    background: ${TEXT};
    color: ${BG};
    transform: translateY(-2px);
  }

  .tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .fade-up { animation: fadeUp 0.8s ease forwards; }
  .fade-in { animation: fadeIn 0.6s ease forwards; }

  .project-card {
    position: relative;
    overflow: hidden;
    cursor: none;
    background: ${TEXT};
  }
  .project-card:hover .card-overlay { opacity: 1; }
  .project-card:hover .card-img { transform: scale(1.06); }
  .project-card:hover .card-arrow { transform: translate(0, 0); opacity: 1; }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
    filter: grayscale(20%);
  }

  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${ACCENT}ee 0%, ${TEXT}cc 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 28px;
  }

  .card-arrow {
    position: absolute;
    top: 20px; right: 20px;
    width: 44px; height: 44px;
    background: ${BG};
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    transform: translate(8px, -8px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .service-card {
    border: 1px solid ${TEXT}22;
    padding: 40px 32px;
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
    cursor: none;
  }
  .service-card:hover {
    border-color: ${ACCENT};
    background: ${TEXT};
    color: ${BG};
    transform: translateY(-6px);
  }
  .service-card:hover .service-num { color: ${ACCENT}; }
  .service-card:hover .service-title { color: ${BG}; }
  .service-card:hover .service-desc { color: ${BG}aa; }

  .workflow-step {
    position: relative;
    cursor: none;
  }
  .workflow-step:hover .step-num { background: ${ACCENT}; color: ${TEXT}; }
  .workflow-step:hover .step-line { background: ${ACCENT}; }

  .contact-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${TEXT}44;
    padding: 16px 0;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: ${TEXT};
    outline: none;
    transition: border-color 0.3s;
    cursor: none;
  }
  .contact-input::placeholder { color: ${TEXT}66; }
  .contact-input:focus { border-bottom-color: ${ACCENT}; }

  .nav-sticky {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 48px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.3s, backdrop-filter 0.3s;
  }
  .nav-sticky.scrolled {
    background: ${BG}ee;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${TEXT}11;
  }

  .ticker-wrap {
    overflow: hidden;
    border-top: 1px solid ${TEXT}22;
    border-bottom: 1px solid ${TEXT}22;
    padding: 14px 0;
    background: ${TEXT};
  }
  .ticker-inner {
    display: flex;
    width: max-content;
    animation: ticker 22s linear infinite;
    white-space: nowrap;
  }
  .ticker-item {
    font-family: 'Times New Roman', serif;
    font-style: italic;
    font-size: 15px;
    color: ${BG};
    padding: 0 40px;
  }
  .ticker-dot {
    color: ${ACCENT};
    font-size: 20px;
    padding: 0 4px;
  }

  .modal-bg {
    position: fixed;
    inset: 0;
    background: ${TEXT}dd;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.25s ease;
  }
  .modal-box {
    background: ${BG};
    max-width: 880px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: fadeUp 0.3s ease;
    position: relative;
  }

  .section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${TEXT}88;
    font-family: 'Inter', sans-serif;
  }

  .divider {
    width: 60px; height: 2px;
    background: ${ACCENT};
    display: inline-block;
    animation: slideRight 0.6s ease forwards;
    transform-origin: left;
  }

  @media (max-width: 768px) {
    .nav-sticky { padding: 0 20px; }
    .hero-title { font-size: clamp(52px, 12vw, 120px) !important; }
  }
`;

const projects = [
  { id: 1, title: "CR7 x Heritage", cat: "Design de Atleta", color: "#1a1a2e", aspect: "tall", desc: "Identidade visual cinematográfica unindo o legado de Ronaldo a uma estética editorial atemporal.", tags: ["Identidade", "Editorial", "Atleta"], process: ["Pesquisa e moodboard com 3 décadas de fotografia do CR7", "Construção do sistema tipográfico em torno de poder e elegância", "Definição de paleta, proporções e comportamento da marca", "Entrega final: 48 peças em 6 plataformas"] },
  { id: 2, title: "Flamengo Matchday", cat: "Dia de Jogo", color: "#8B0000", aspect: "wide", desc: "Visuais elétricos de dia de jogo para a campanha da Libertadores 2024 do Flamengo — ousados, apaixonados, icônicos.", tags: ["Dia de Jogo", "Futebol", "Brasil"], process: ["Briefing do clube: energia máxima, vermelho máximo", "Desenvolvimento de sistema modular com 12 templates", "Teste de comportamento das peças em diferentes formatos", "Alcance orgânico: 2,4M impressões no lançamento"] },
  { id: 3, title: "Adidas Drop", cat: "Mídias Sociais", color: "#000814", aspect: "square", desc: "Campanha social-first para um lançamento limitado da Adidas Football. Minimal. Brutal. Esgotado em 4 horas.", tags: ["Social", "Adidas", "Campanha"] },
  { id: 4, title: "Neymar Jr.", cat: "Design de Atleta", color: "#003049", aspect: "tall", desc: "Identidade visual para a marca pessoal do NJr — onde lifestyle encontra performance de elite.", tags: ["Atleta", "Identidade", "Esporte"] },
  { id: 5, title: "Pulse Jersey", cat: "Camisas", color: "#2d6a4f", aspect: "square", desc: "Design de camisa conceitual explorando padrão geométrico como linguagem visual — arte que se veste.", tags: ["Camisa", "Conceito", "Esporte"] },
  { id: 6, title: "Real Madrid Social", cat: "Mídias Sociais", color: "#6b3fa0", aspect: "wide", desc: "Direção semanal de redes sociais para o Instagram do Real Madrid — 14M de alcance semanal.", tags: ["Social", "Madrid", "Estratégia"] },
  { id: 7, title: "Camisa Conceito PR", cat: "Camisas", color: "#1a3a2e", aspect: "square", desc: "Proposta de camisa para clube paranaense — identidade regional traduzida em linguagem esportiva contemporânea.", tags: ["Camisa", "Paraná", "Identidade"] },
  { id: 8, title: "Mbappé Era", cat: "Design de Atleta", color: "#1b1b2f", aspect: "wide", desc: "Identidade visual capturando a era Mbappé — velocidade, juventude e peso cultural.", tags: ["Identidade", "Atleta", "Editorial"] },
];

const services = [
  { num: "01", title: "Social Media Esportivo", desc: "Artes de dia de jogo, conteúdo de atletas, campanhas sazonais. Peças que param o scroll e constroem a identidade do clube nas redes." },
  { num: "02", title: "Design de Atleta", desc: "Identidade visual para atletas que querem uma presença inconfundível. Do escudo pessoal ao conteúdo que representa quem você é em campo." },
  { num: "03", title: "Design de Camisas", desc: "Camisas são o produto mais íntimo de um clube. Design com intenção — tipografia, proporção, comportamento em campo. Um uniforme que vira símbolo." },
  { num: "04", title: "Identidade Visual de Clube", desc: "Escudo, paleta, tipografia, sistema visual completo. As decisões que a maioria ignora e que definem se uma identidade dura dez anos ou gerações." },
];

const workflow = [
  { num: "01", title: "Briefing", desc: "Imersão total na sua visão, no clube, no atleta, no que você quer que as pessoas sintam ao ver sua marca." },
  { num: "02", title: "Conceito", desc: "Referências, moodboard e proposta visual — antes de qualquer pixel, a gente alinha o caminho." },
  { num: "03", title: "Design", desc: "Craft. Precisão. Decisões que a maioria ignora. O trabalho que faz a diferença entre genérico e inconfundível." },
  { num: "04", title: "Revisões", desc: "Duas rodadas de refinamento para aperfeiçoar cada detalhe até ficar exatamente certo." },
  { num: "05", title: "Entrega", desc: "Arquivos organizados e prontos para uso — em qualquer formato, em qualquer plataforma." },
];

const categories = ["Todos", "Dia de Jogo", "Mídias Sociais", "Design de Atleta", "Branding", "Motion Design", "Camisas"];

function ProjectCard({ project, onClick }) {
  const svgPatterns = {
    "Design de Atleta": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 500'><rect width='400' height='500' fill='${project.color}'/><circle cx='200' cy='180' r='80' fill='none' stroke='${ACCENT}' stroke-width='1' opacity='0.4'/><circle cx='200' cy='180' r='120' fill='none' stroke='${ACCENT}' stroke-width='0.5' opacity='0.2'/><line x1='0' y1='180' x2='400' y2='180' stroke='white' stroke-width='0.5' opacity='0.1'/><text x='200' y='370' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='52' fill='white' opacity='0.15'>${project.title}</text><rect x='160' y='100' width='80' height='100' rx='40' fill='white' opacity='0.06'/></svg>`,
    "Dia de Jogo": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 600 340'><rect width='600' height='340' fill='${project.color}'/><polygon points='0,340 600,0 600,340' fill='${ACCENT}' opacity='0.12'/><circle cx='300' cy='170' r='60' fill='none' stroke='white' stroke-width='2' opacity='0.15'/><text x='300' y='195' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='64' fill='white' opacity='0.12'>${project.title}</text><line x1='0' y1='0' x2='600' y2='340' stroke='${ACCENT}' stroke-width='0.5' opacity='0.3'/></svg>`,
    "Mídias Sociais": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'><rect width='400' height='400' fill='${project.color}'/><rect x='40' y='40' width='320' height='320' fill='none' stroke='${ACCENT}' stroke-width='1' opacity='0.2'/><rect x='80' y='80' width='240' height='240' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/><text x='200' y='220' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='48' fill='white' opacity='0.13'>${project.title}</text></svg>`,
    "Branding": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 500'><rect width='400' height='500' fill='${project.color}'/><polygon points='200,40 360,140 360,360 200,460 40,360 40,140' fill='none' stroke='${ACCENT}' stroke-width='1' opacity='0.25'/><polygon points='200,100 310,160 310,340 200,400 90,340 90,160' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/><text x='200' y='270' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='40' fill='white' opacity='0.13'>${project.title}</text></svg>`,
    "Camisas": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'><rect width='400' height='400' fill='${project.color}'/><line x1='0' y1='50' x2='400' y2='50' stroke='${ACCENT}' stroke-width='1' opacity='0.2'/><line x1='0' y1='100' x2='400' y2='100' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><line x1='0' y1='150' x2='400' y2='150' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><line x1='0' y1='200' x2='400' y2='200' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><line x1='0' y1='250' x2='400' y2='250' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><line x1='0' y1='300' x2='400' y2='300' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><text x='200' y='230' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='48' fill='white' opacity='0.14'>${project.title}</text></svg>`,
    "Motion Design": `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 600 340'><rect width='600' height='340' fill='${project.color}'/><ellipse cx='300' cy='170' rx='200' ry='100' fill='none' stroke='${ACCENT}' stroke-width='1' opacity='0.2'/><ellipse cx='300' cy='170' rx='150' ry='75' fill='none' stroke='${ACCENT}' stroke-width='0.5' opacity='0.12'/><ellipse cx='300' cy='170' rx='100' ry='50' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/><text x='300' y='185' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='52' fill='white' opacity='0.13'>${project.title}</text></svg>`,
  };

  const fallback = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'><rect width='400' height='400' fill='${project.color}'/><text x='200' y='210' text-anchor='middle' font-family='Times New Roman' font-style='italic' font-size='48' fill='white' opacity='0.15'>${project.title}</text></svg>`;
  const svg = svgPatterns[project.cat] || fallback;
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  const heights = { tall: "520px", wide: "280px", square: "380px" };
  const h = heights[project.aspect] || "360px";

  return (
    <div className="project-card" style={{ height: h, gridRow: project.aspect === "tall" ? "span 2" : "span 1" }} onClick={() => onClick(project)}>
      <img src={dataUrl} alt={project.title} className="card-img" style={{ height: "100%" }} />
      <div className="card-overlay">
        <span className="tag" style={{ color: ACCENT, marginBottom: 8 }}>{project.cat}</span>
        <h3 className="headline" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: BG, lineHeight: 1 }}>{project.title}</h3>
        <div className="card-arrow">→</div>
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Banner */}
        <div style={{ height: 320, background: project.color, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${project.color} 0%, ${TEXT} 100%)`, opacity: 0.6 }} />
          <div style={{ padding: "40px 48px", position: "relative", zIndex: 2 }}>
            <span className="tag" style={{ color: ACCENT, display: "block", marginBottom: 12 }}>{project.cat}</span>
            <h2 className="headline" style={{ fontSize: "clamp(36px, 6vw, 72px)", color: BG }}>{project.title}</h2>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: BG, border: "none", width: 44, height: 44, fontSize: 20, cursor: "none", fontFamily: "Inter", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: "48px" }}>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT, maxWidth: 600, marginBottom: 40 }}>{project.desc}</p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            {project.tags?.map(t => (
              <span key={t} style={{ padding: "8px 18px", border: `1px solid ${TEXT}33`, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Inter" }}>{t}</span>
            ))}
          </div>

          {project.process && (
            <>
              <div className="section-label" style={{ marginBottom: 24 }}>Processo Criativo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
                {project.process.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "Times New Roman", fontStyle: "italic", fontSize: 22, color: ACCENT, minWidth: 36, lineHeight: 1.4 }}>0{i + 1}</span>
                    <p style={{ fontSize: 15, lineHeight: 1.6, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Mockup placeholder */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ height: 200, background: project.color, opacity: 0.7 + i * 0.1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Times New Roman", fontStyle: "italic", fontSize: 18, color: BG, opacity: 0.6 }}>Mockup {i + 1}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{ width: "100%", textAlign: "center" }}>Iniciar um Projeto Similar →</button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [formData, setFormData] = useState({ name: "", email: "", project: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [visible, setVisible] = useState({});
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = e => {
      setCursorPos({ x: e.clientX - 6, y: e.clientY - 6 });
      const target = { x: e.clientX - 18, y: e.clientY - 18 };
      const animate = () => {
        ringRef.current.x += (target.x - ringRef.current.x) * 0.14;
        ringRef.current.y += (target.y - ringRef.current.y) * 0.14;
        setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
        rafRef.current = requestAnimationFrame(animate);
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true })); });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-id]").forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const filtered = activeFilter === "Todos" ? projects : projects.filter(p => p.cat === activeFilter);

  const handleSend = () => {
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setFormData({ name: "", email: "", project: "", message: "" });
  };

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: BG, color: TEXT }}>
      <style>{styles}</style>

      {/* Custom cursor */}
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: ringPos.x, top: ringPos.y }} />

      {/* Modal */}
      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* ─── NAV ─── */}
      <nav className={`nav-sticky ${scrolled ? "scrolled" : ""}`}>
        <div className="headline" style={{ fontSize: 22, letterSpacing: -1 }}>LM</div>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Trabalhos", "Sobre", "Serviços", "Contato"].map(s => (
            <a key={s} className="nav-link" onClick={() => scrollTo(s === "Trabalhos" ? "work" : s === "Sobre" ? "about" : s === "Serviços" ? "services" : "contact")} style={{ cursor: "none" }}>{s}</a>
          ))}
        </div>
        <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 24px", fontSize: 10 }}>Vamos Conversar →</button>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", width: 520, height: 520, borderRadius: "50%", border: `1px solid ${TEXT}0f`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${ACCENT}33`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, right: "15%", fontFamily: "Mynerve, cursive", fontSize: 14, color: TEXT, opacity: 0.35, transform: "rotate(-8deg)", animation: "float 5s ease-in-out infinite" }}>
          design esportivo&nbsp;&amp;&nbsp;direção criativa
        </div>
        <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 200, height: 200, animation: "spin-slow 20s linear infinite" }}>
          <svg viewBox="0 0 200 200" width="200" height="200">
            <defs>
              <path id="circle-path" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
            </defs>
            <text fontSize="11.5" fontFamily="Inter" fontWeight="700" letterSpacing="4" fill={`${TEXT}55`} textTransform="uppercase">
              <textPath href="#circle-path">CULTURA DO FUTEBOL · EXCELÊNCIA VISUAL · </textPath>
            </text>
          </svg>
        </div>

        {/* Year badge */}
        <div data-id="hero-badge" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, opacity: visible["hero-badge"] ? 1 : 0, transition: "opacity 0.6s ease, transform 0.6s ease", transform: visible["hero-badge"] ? "none" : "translateY(20px)" }}>
          <div className="divider" />
          <span className="section-label">Desde 2019 · Maringá, Paraná</span>
        </div>

        {/* Main headline */}
        <div data-id="hero-h1" style={{ opacity: visible["hero-h1"] ? 1 : 0, transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s", transform: visible["hero-h1"] ? "none" : "translateY(50px)" }}>
          <h1 className="headline" style={{ fontSize: "clamp(64px, 11vw, 160px)", color: TEXT, lineHeight: 0.88 }}>
            Lorena
            <br />
            <span style={{ color: ACCENT }}>Mariano</span>
          </h1>
        </div>

        <div data-id="hero-sub" style={{ marginTop: 32, maxWidth: 560, opacity: visible["hero-sub"] ? 1 : 0, transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s", transform: visible["hero-sub"] ? "none" : "translateY(30px)" }}>
          <p style={{ fontFamily: "Mynerve, cursive", fontSize: 22, color: TEXT, marginBottom: 12, opacity: 0.8 }}>Designer Esportiva & Direção Criativa</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: `${TEXT}bb`, maxWidth: 440 }}>Criando identidades visuais para clubes de futebol, atletas e marcas esportivas que exigem muito mais do que design comum.</p>
        </div>

        <div data-id="hero-cta" style={{ display: "flex", gap: 16, marginTop: 48, flexWrap: "wrap", opacity: visible["hero-cta"] ? 1 : 0, transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s", transform: visible["hero-cta"] ? "none" : "translateY(20px)" }}>
          <button className="btn-primary" onClick={() => scrollTo("work")}>Ver Portfólio →</button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Iniciar Projeto</button>
        </div>

        {/* Stats */}
        <div data-id="hero-stats" style={{ display: "flex", gap: 60, marginTop: 80, opacity: visible["hero-stats"] ? 1 : 0, transition: "opacity 0.8s ease 0.7s", flexWrap: "wrap" }}>
          {[["5+", "Anos"], ["80+", "Projetos"], ["30+", "Clubes & Marcas"], ["12M+", "Alcance Total"]].map(([num, label]) => (
            <div key={label}>
              <div className="headline" style={{ fontSize: 44, color: TEXT }}>{num}</div>
              <div className="section-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              {["Cultura do Futebol", "Identidade Visual", "Marca de Atleta", "Arte de Jogo", "Direção Criativa", "Social Media Esportivo", "Design de Camisa", "Conteúdo em Motion"].map((t, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center" }}>
                  <span className="ticker-item">{t}</span>
                  <span className="ticker-dot">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── PORTFOLIO ─── */}
      <section id="work" style={{ padding: "120px 48px" }}>
        <div data-id="port-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 32, opacity: visible["port-header"] ? 1 : 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: visible["port-header"] ? "none" : "translateY(30px)" }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Trabalhos Selecionados</div>
            <h2 className="headline" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Portfólio</h2>
          </div>
          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{ padding: "10px 18px", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Inter", border: `1px solid ${activeFilter === cat ? TEXT : TEXT + "33"}`, background: activeFilter === cat ? TEXT : "transparent", color: activeFilter === cat ? BG : TEXT, cursor: "none", transition: "all 0.2s" }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, gridAutoRows: "260px" }}>
          {filtered.map((p, i) => (
            <div key={p.id} data-id={`card-${p.id}`} style={{ opacity: visible[`card-${p.id}`] ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`, transform: visible[`card-${p.id}`] ? "none" : "translateY(30px)" }}>
              <ProjectCard project={p} onClick={setSelectedProject} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: "120px 48px", background: TEXT, color: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: visual */}
          <div data-id="about-img" style={{ opacity: visible["about-img"] ? 1 : 0, transition: "opacity 1s ease", position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "3/4", background: `linear-gradient(135deg, ${ACCENT}33, ${TEXT})`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="headline" style={{ fontSize: "clamp(80px, 14vw, 180px)", color: BG, opacity: 0.07, letterSpacing: -8 }}>LM</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 40px", background: "linear-gradient(transparent, rgba(8,9,41,0.9))" }}>
                <div className="accent-font" style={{ fontSize: 28, color: ACCENT, marginBottom: 4 }}>Lorena Mariano</div>
                <div className="section-label" style={{ color: `${BG}88` }}>Maringá · Paraná · Brasil</div>
              </div>
              {/* Decorative border */}
              <div style={{ position: "absolute", inset: 20, border: `1px solid ${ACCENT}33`, pointerEvents: "none" }} />
            </div>
            <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: ACCENT, zIndex: -1 }} />
          </div>

          {/* Right: text */}
          <div data-id="about-text" style={{ opacity: visible["about-text"] ? 1 : 0, transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s", transform: visible["about-text"] ? "none" : "translateY(30px)" }}>
            <div className="section-label" style={{ color: `${BG}66`, marginBottom: 20 }}>Sobre</div>
            <h2 className="headline" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: BG, marginBottom: 32 }}>
              O Design
              <br />
              <span style={{ color: ACCENT }}>Por Trás do Jogo</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: `${BG}cc`, marginBottom: 24 }}>
              Sou a Lorena — designer esportiva e diretora criativa com mais de 5 anos construindo universos visuais para clubes de futebol, atletas e marcas esportivas globais.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: `${BG}99`, marginBottom: 40 }}>
              Meu trabalho está na interseção da cultura do futebol com o design editorial de luxo. Cada projeto é construído com a mesma filosofia: linguagem visual ousada, execução precisa e design que performa tão forte quanto os atletas que representa.
            </p>
            <div style={{ padding: "28px 0", borderTop: `1px solid ${BG}22`, borderBottom: `1px solid ${BG}22`, marginBottom: 40 }}>
              <div className="accent-font" style={{ fontSize: 22, color: ACCENT, lineHeight: 1.5 }}>
                "O design é o uniforme<br />antes do primeiro apito."
              </div>
            </div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {["Certificada FIFA", "Parceira Nike", "5 Premiações"].map(badge => (
                <div key={badge} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, background: ACCENT, borderRadius: "50%" }} />
                  <span className="tag" style={{ color: `${BG}88` }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ padding: "120px 48px" }}>
        <div data-id="srv-header" style={{ marginBottom: 64, opacity: visible["srv-header"] ? 1 : 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: visible["srv-header"] ? "none" : "translateY(30px)" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>O Que Faço</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <h2 className="headline" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Serviços</h2>
            <p style={{ maxWidth: 360, fontSize: 15, lineHeight: 1.7, color: `${TEXT}99` }}>Serviços criativos completos para a indústria esportiva — do conceito à entrega.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 1, border: `1px solid ${TEXT}22`, overflow: "hidden" }}>
          {services.map((s, i) => (
            <div key={s.num} className="service-card" data-id={`srv-${i}`} style={{ opacity: visible[`srv-${i}`] ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.08}s`, borderRadius: 0 }}>
              <div className="service-num" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: ACCENT, fontFamily: "Inter", marginBottom: 20, transition: "color 0.3s" }}>{s.num}</div>
              <h3 className="service-title headline" style={{ fontSize: 28, marginBottom: 16, transition: "color 0.3s" }}>{s.title}</h3>
              <p className="service-desc" style={{ fontSize: 14, lineHeight: 1.7, color: `${TEXT}99`, transition: "color 0.3s" }}>{s.desc}</p>
              <div style={{ marginTop: 28, fontSize: 20, fontFamily: "Times New Roman", fontStyle: "italic" }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WORKFLOW ─── */}
      <section id="workflow" style={{ padding: "120px 48px", background: `${TEXT}07`, borderTop: `1px solid ${TEXT}11`, borderBottom: `1px solid ${TEXT}11` }}>
        <div data-id="wf-header" style={{ marginBottom: 80, opacity: visible["wf-header"] ? 1 : 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: visible["wf-header"] ? "none" : "translateY(30px)" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Como Funciona</div>
          <h2 className="headline" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Processo<br /><span style={{ color: ACCENT }}>Criativo</span></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, position: "relative" }}>
          {workflow.map((step, i) => (
            <div key={step.num} className="workflow-step" data-id={`wf-${i}`} style={{ padding: "40px 32px", borderLeft: `1px solid ${TEXT}22`, position: "relative", opacity: visible[`wf-${i}`] ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`, transform: visible[`wf-${i}`] ? "none" : "translateY(20px)" }}>
              <div className="step-num" style={{ width: 52, height: 52, border: `1.5px solid ${TEXT}33`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Times New Roman", fontStyle: "italic", fontSize: 20, marginBottom: 28, transition: "background 0.3s, color 0.3s" }}>{step.num}</div>
              <h3 className="headline" style={{ fontSize: 26, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: `${TEXT}88` }}>{step.desc}</p>
              {i < workflow.length - 1 && (
                <div style={{ position: "absolute", top: 67, right: -1, width: 1, height: 52, background: `${TEXT}22`, zIndex: 1 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FULL-WIDTH BANNER ─── */}
      <div style={{ background: ACCENT, padding: "60px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <h3 className="headline" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: TEXT }}>Pronta para elevar sua marca?</h3>
          <p className="accent-font" style={{ fontSize: 18, color: TEXT, opacity: 0.7, marginTop: 4 }}>Vamos construir algo extraordinário juntos.</p>
        </div>
        <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ background: TEXT, color: BG, whiteSpace: "nowrap" }}>Iniciar Projeto →</button>
      </div>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div data-id="contact-left" style={{ opacity: visible["contact-left"] ? 1 : 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: visible["contact-left"] ? "none" : "translateY(30px)" }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Entre em Contato</div>
            <h2 className="headline" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 32 }}>
              Vamos Criar
              <br />
              <span style={{ color: ACCENT }}>Juntos</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: `${TEXT}99`, marginBottom: 56 }}>Disponível para projetos, campanhas e parcerias criativas. Baseada em Maringá, Paraná — atendendo o mundo inteiro.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <a href="https://wa.me/5511999999999" style={{ display: "flex", alignItems: "center", gap: 20, textDecoration: "none", color: TEXT, padding: "20px 24px", border: `1px solid ${TEXT}22`, transition: "border-color 0.3s, background 0.3s", cursor: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#25D366"; e.currentTarget.style.background = "#25D36611"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${TEXT}22`; e.currentTarget.style.background = "transparent"; }}>
                <div style={{ width: 44, height: 44, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <div className="tag" style={{ display: "block", marginBottom: 2, color: `${TEXT}66` }}>WhatsApp</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>+55 11 9 9999-9999</div>
                </div>
              </a>

              <a href="https://instagram.com/lorenamariano.design" style={{ display: "flex", alignItems: "center", gap: 20, textDecoration: "none", color: TEXT, padding: "20px 24px", border: `1px solid ${TEXT}22`, transition: "border-color 0.3s, background 0.3s", cursor: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#E1306C"; e.currentTarget.style.background = "#E1306C11"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${TEXT}22`; e.currentTarget.style.background = "transparent"; }}>
                <div style={{ width: 44, height: 44, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <div>
                  <div className="tag" style={{ display: "block", marginBottom: 2, color: `${TEXT}66` }}>Instagram</div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>@lorenamariano.design</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div data-id="contact-form" style={{ opacity: visible["contact-form"] ? 1 : 0, transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s", transform: visible["contact-form"] ? "none" : "translateY(30px)" }}>
            {formSent ? (
              <div style={{ padding: "60px 40px", textAlign: "center", border: `1px solid ${ACCENT}`, animation: "fadeIn 0.4s ease" }}>
                <div className="headline" style={{ fontSize: 48, color: ACCENT, marginBottom: 16 }}>✓</div>
                <h3 className="headline" style={{ fontSize: 28, marginBottom: 12 }}>Mensagem Enviada!</h3>
                <p style={{ color: `${TEXT}88` }}>Retorno em até 24 horas.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 40 }}>
                  {[
                    { key: "name", label: "Seu Nome", placeholder: "Nome e Sobrenome", type: "text" },
                    { key: "email", label: "E-mail", placeholder: "ola@suamarca.com.br", type: "email" },
                    { key: "project", label: "Tipo de Projeto", placeholder: "Social Media / Branding / Motion...", type: "text" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="tag" style={{ display: "block", marginBottom: 8, color: `${TEXT}66` }}>{f.label}</label>
                      <input className="contact-input" type={f.type} placeholder={f.placeholder} value={formData[f.key]} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} />
                    </div>
                  ))}
                  <div>
                    <label className="tag" style={{ display: "block", marginBottom: 8, color: `${TEXT}66` }}>Conte sobre o seu projeto</label>
                    <textarea className="contact-input" placeholder="Breve descrição da sua visão, prazo e objetivos..." rows={4} value={formData.message} onChange={e => setFormData(d => ({ ...d, message: e.target.value }))} style={{ resize: "vertical", minHeight: 100 }} />
                  </div>
                </div>
                <button className="btn-primary" style={{ width: "100%", textAlign: "center" }} onClick={handleSend}>Enviar Mensagem →</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${TEXT}22`, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div className="headline" style={{ fontSize: 24 }}>Lorena Mariano</div>
        <div className="accent-font" style={{ fontSize: 16, color: `${TEXT}66` }}>Designer Esportiva & Direção Criativa</div>
        <div className="section-label">© 2024 — Maringá, Paraná, Brasil</div>
      </footer>
    </div>
  );
}
