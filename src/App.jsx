import { useEffect, useState, useRef } from 'react';
import NetworkBackground from './components/NetworkBackground';
import CursorCanvas from './components/CursorCanvas';
import GitHubActivity from './components/GitHubActivity';
import {
  FiMail, FiGithub, FiFileText,
  FiBriefcase, FiCode, FiBook, FiTool, FiHome, FiUser,
  FiExternalLink, FiAward,
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

/* ─── DADOS DO PORTFÓLIO ─── */
const DATA = {
  name: 'Eduardo Dourado',
  title: 'Desenvolvedor Júnior | Analista de Dados',
  tagline: 'Transformo problemas complexos em aplicações web eficientes — unindo código limpo, arquitetura robusta e foco em experiência do usuário.',
  location: 'Fortaleza/CE, Brasil',
  openToWork: true,
  avatar: 'https://github.com/edudouraado.png',
  email: 'edusalesoliveira@hotmail.com',
  linkedin: 'https://linkedin.com/in/eduardodouradosdo',
  github: 'https://github.com/edudouraado',
  whatsapp: 'https://wa.me/5561983439617',
  instagram: 'https://instagram.com/edudouraado',
  resume: '/curriculo.pdf',

  about: `Sou Eduardo, desenvolvedor Full Stack em transição de carreira com uma particularidade: antes de escrever código, eu aprendi a entender negócios.

Graduado em Direito e cursando Análise e Desenvolvimento de Sistemas na UNIFOR, trago uma bagagem analítica sólida construída na prática de processos complexos, auditoria e automação de fluxos. Hoje, transformo desafios operacionais e dores de negócios em aplicações web eficientes, seguras e escaláveis: de APIs robustas em Python e Node.js a interfaces modernas em React, combino essa base analítica com código limpo para transformar processos manuais em soluções eficientes: dashboards que guiam decisões, APIs que eliminam retrabalho e automações que liberam tempo do time.

Meu diferencial é aliar código limpo a uma mentalidade voltada a resultados — garantindo que a tecnologia entregue valor real, seja qual for o domínio do problema. Não é só saber programar — é saber o que programar, porque eu já estive do outro lado da mesa.`,

  experience: [
    {
      role: 'Analista Junior',
      company: 'SB Farma',
      period: ' Fev 2025 – Presente',
      bullets: [
        'Desenvolvimento e implementação de rotinas automatizadas em Python para auditorias de estoque e mitigação de perdas.',
        'Concepção e estruturação de dashboards analíticos para monitoramento de giro de produtos e suporte a decisões estratégicas.',
        'Engenharia de scripts para processamento massivo e parsing de arquivos fiscais (XML), otimizando a rastreabilidade e integridade dos dados.',
      ],
    },
    {
      role: 'Assistente Jurídico',
      company: 'Fernandes e Parente Advogados Associados',
      period: 'Jan 2022 – Ago 2023',
      bullets: [
        'Atuação em escritório nas áreas Previdenciária e Tributária, com abrangência nacional e atendimento em tribunais federais. Responsável pela elaboração e revisão de peças jurídicas, como petições, recursos e pareceres. Apoio no acompanhamento de processos administrativos e judiciais, com foco em legislação e jurisprudência atualizada, visando a defesa dos direitos dos clientes.',
      ],
    },
    {
      role: 'Estagiário de Direito',
      company: 'CAESB – Companhia de Saneamento Ambiental do Distrito Federal',
      period: 'Jan 2020 – Ago 2021',
      bullets: [
        'Assistência a demandas externas e revisão de minutas de peças processuais. Gestão de documentos (digitalização, recebimento, distribuição e arquivamento) e lançamento de dados no sistema CAESB. Suporte à equipe jurídica em rotinas administrativas,  atendimento de ligações, e-mails e correspondências. Protocolo  de documentos em órgãos públicos, pesquisas jurisprudenciais  e acompanhamento de andamentos processuais, contribuindo  para a organização do setor.',
      ],
    },
  ],

  projects: [
    {
      name: 'Auditoria de Estoque',
      desc: 'API REST Serverless de alta performance para cruzamento automatizado de dados fiscais com inventário físico, reduzindo o tempo de auditoria em 70%.',
      tech: ['Python', 'FastAPI', 'PostgreSQL'],
      status: 'Live',
      statusColor: 'bg-green-500',
      github: 'https://github.com/edudouraado',
      link: null,
      type: 'API / Backend',
      date: '2025',
    },
    {
      name: 'Conversão e Giro',
      desc: 'Motor analítico baseado em SQL avançado (CTEs e subconsultas otimizadas) para cruzamento de dados de PDV e transferências, identificando gargalos e itens críticos.',
      tech: ['SQL Avançado', 'PostgreSQL', 'Python'],
      status: 'Complete',
      statusColor: 'bg-blue-500',
      github: 'https://github.com/edudouraado',
      link: null,
      type: 'Análise de Dados',
      date: '2026',
    },
    {
      name: 'Automação Fiscal (XML)',
      desc: 'Pipeline de parsing massivo para extração e processamento de milhares de notas fiscais por hora, garantindo rastreabilidade de lotes e mitigação de perdas.',
      tech: ['Python', 'Pandas', 'XML'],
      status: 'Live',
      statusColor: 'bg-green-500',
      github: 'https://github.com/edudouraado',
      link: null,
      type: 'Automação / Data',
      date: '2025',
    },
    {
      name: 'Plataforma Openest',
      desc: 'Aplicação web e mobile interativa com feed dinâmico, consumo de APIs e modularização de componentes via React, focada em performance e experiência de usuário.',
      tech: ['React', 'Node.js', 'Axios'],
      status: 'In Progress',
      statusColor: 'bg-yellow-500',
      github: 'https://github.com/edudouraado',
      link: null,
      type: 'Web Application',
      date: '2026',
    },
  ],

  education: [
    {
      degree: 'Análise e Desenvolvimento de Sistemas',
      school: 'UNIFOR – Universidade de Fortaleza',
      period: '2024 – 2026',
      desc: 'Foco em desenvolvimento de software, banco de dados e engenharia de sistemas.',
    },
    {
      degree: 'Bacharelado em Direito',
      school: 'UniCEUB – Centro Universitário de Brasília',
      period: '2018 – 2023',
      desc: 'Base analítica e pensamento crítico aplicados à resolução de problemas complexos.',
    },
  ],

  certificates: [
    { name: 'Python', issuer: 'FIAP', link: null },
    { name: 'Python Development', issuer: 'FIAP', link: null },
    { name: 'Excel do Básico ao Avançado', issuer: 'Fundação Bradesco', link: null },
    { name: 'HTML e CSS', issuer: 'Curso em Vídeo', link: null },
  ],

  skills: {
    'Back-end': ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'SQL Avançado', 'REST APIs'],
    'Front-end': ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Dados & Automação': ['Pandas', 'Numpy', 'XML Parsing', 'ETL', 'Análise de Dados'],
    'Ferramentas': ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Postman'],
  },
};

/* ─── NAV ─── */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <FiHome /> },
  { id: 'about', label: 'Sobre', icon: <FiUser /> },
  { id: 'experience', label: 'Experiência', icon: <FiBriefcase /> },
  { id: 'projects', label: 'Projetos', icon: <FiCode /> },
  { id: 'education', label: 'Educação', icon: <FiBook /> },
  { id: 'skills', label: 'Skills', icon: <FiTool /> },
  { id: 'github', label: 'GitHub', icon: <FiGithub /> },
];

/* ─── SECTION TITLE ─── */
function SectionTitle({ children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 font-mono">{children}</h2>
      <div className="w-12 h-[3px] bg-[var(--color-primary)] rounded-full" />
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy
  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id);
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [setActiveSection]);

  // Section entrance animations
  const sectionRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  return (
    <>
      <NetworkBackground />
      <CursorCanvas />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[var(--color-border)] bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center">
            <div className="flex items-center space-x-1 md:space-x-2">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  title={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-200
                    ${activeSection === item.id
                      ? 'text-[var(--color-primary)] bg-[var(--color-hover-background)] border border-[var(--color-border)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-hover-background)]'
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-24">

          {/* ═══ HERO ═══ */}
          <section id="home" className="section-enter" ref={addRef}>
            <div className="flex flex-col items-center text-center py-8 space-y-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[var(--color-border)] shadow-[0_0_40px_rgba(0,255,170,0.15)]">
                  <img
                    src={DATA.avatar}
                    alt={DATA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {DATA.openToWork && (
                  <div className="absolute -bottom-2 -right-2 bg-[var(--color-card-background)] rounded-full px-3 py-1.5 border border-[var(--color-border)] shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium font-mono text-[var(--color-text-secondary)]">Open to work</span>
                  </div>
                )}
              </div>

              {/* Nome e título */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-semibold text-[var(--color-text-primary)] font-mono tracking-tight">
                  {DATA.name}
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-card-background)] rounded-full border border-[var(--color-border)]">
                  <FiBriefcase className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <span className="text-sm sm:text-base font-medium font-mono text-[var(--color-text-primary)]">{DATA.title}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[var(--color-secondary)] font-mono text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {DATA.location}
                </div>
                <p className="max-w-2xl mx-auto text-sm sm:text-base font-mono text-[var(--color-text-secondary)] leading-relaxed">
                  {DATA.tagline}
                </p>
              </div>

              {/* Links sociais */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                <SocialLink href={`mailto:${DATA.email}`} icon={<FiMail className="w-5 h-5" />} label="Email" />
                <SocialLink href={DATA.linkedin} icon={<FaLinkedin className="w-5 h-5" />} label="LinkedIn" />
                <SocialLink href={DATA.github} icon={<FaGithub className="w-5 h-5" />} label="GitHub" />
                <SocialLink href={DATA.whatsapp} icon={<FaWhatsapp className="w-5 h-5" />} label="WhatsApp" />
                <SocialLink href={DATA.instagram} icon={<FaInstagram className="w-5 h-5" />} label="Instagram" />
                <SocialLink href={DATA.resume} icon={<FiFileText className="w-5 h-5" />} label="Currículo" download />
              </div>
            </div>
          </section>

          {/* ═══ SOBRE ═══ */}
          <section id="about" className="section-enter" ref={addRef}>
            <SectionTitle>Sobre</SectionTitle>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm font-mono whitespace-pre-line">
              {DATA.about}
            </p>
          </section>

          {/* ═══ EXPERIÊNCIA ═══ */}
          <section id="experience" className="section-enter" ref={addRef}>
            <SectionTitle>Experiência</SectionTitle>
            <div className="space-y-6">
              {DATA.experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-lg p-6 border border-[var(--color-border)] bg-[var(--color-card-background)]
                             hover:bg-[var(--color-hover-background)] hover:border-[var(--color-primary)]/40
                             transition-all duration-300 group"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-lg font-semibold font-mono text-[var(--color-text-primary)]">{exp.role}</h3>
                    <FiExternalLink className="w-4 h-4 text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
                  </div>
                  <p className="font-medium font-mono text-[var(--color-text-primary)] text-sm">{exp.company}</p>
                  <p className="text-xs font-mono text-[var(--color-text-secondary)] mb-4">{exp.period}</p>
                  <ul className="space-y-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm font-mono text-[var(--color-text-secondary)] flex gap-2">
                        <span className="text-[var(--color-primary)] shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ PROJETOS ═══ */}
          <section id="projects" className="section-enter" ref={addRef}>
            <div className="flex items-center gap-3 mb-8">
              <SectionTitle>Projetos</SectionTitle>
              <span className="text-xl font-mono text-[var(--color-text-secondary)] -mt-3">({DATA.projects.length})</span>
            </div>
            <div className="flex flex-col gap-8">
              {DATA.projects.map((proj, i) => (
                <ProjectCard key={i} proj={proj} />
              ))}
            </div>
          </section>

          {/* ═══ EDUCAÇÃO ═══ */}
          <section id="education" className="section-enter" ref={addRef}>
            <SectionTitle>Educação</SectionTitle>
            <div className="space-y-6">
              {DATA.education.map((edu, i) => (
                <div key={i} className="rounded-lg p-6 border border-[var(--color-border)] bg-[var(--color-card-background)] hover:bg-[var(--color-hover-background)] transition-all duration-300">
                  <h3 className="text-lg font-semibold font-mono text-[var(--color-text-primary)] mb-1">{edu.degree}</h3>
                  <p className="font-medium font-mono text-[var(--color-text-primary)] text-sm">{edu.school}</p>
                  <p className="text-xs font-mono text-[var(--color-text-secondary)] mb-3">{edu.period}</p>
                  <p className="text-sm font-mono text-[var(--color-text-secondary)]">{edu.desc}</p>
                </div>
              ))}
            </div>

            {/* Certificados */}
            <div className="mt-8">
              <h3 className="text-sm font-mono text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
                Certificados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DATA.certificates.map((cert, i) => {
                  const inner = (
                    <>
                      <FiAward className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] truncate">{cert.name}</p>
                        <p className="text-xs font-mono text-[var(--color-text-secondary)]">{cert.issuer}</p>
                      </div>
                    </>
                  );
                  const baseClass = 'flex items-start gap-3 rounded-lg p-4 border border-[var(--color-border)] bg-[var(--color-card-background)] transition-all duration-300';
                  return cert.link ? (
                    <a
                      key={i}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClass} hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-hover-background)] group`}
                    >
                      {inner}
                      <FiExternalLink className="w-3.5 h-3.5 text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0 mt-1" />
                    </a>
                  ) : (
                    <div key={i} className={baseClass}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ SKILLS ═══ */}
          <section id="skills" className="section-enter" ref={addRef}>
            <SectionTitle>Skills</SectionTitle>
            <div className="space-y-6">
              {Object.entries(DATA.skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-mono text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-mono font-medium
                          bg-[var(--color-hover-background)] text-[var(--color-text-primary)]
                          border border-[var(--color-border)] rounded-md
                          hover:border-[var(--color-primary)]/60 hover:shadow-[0_0_10px_rgba(0,255,170,0.1)]
                          transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ GITHUB ACTIVITY ═══ */}
          <section id="github" className="section-enter" ref={addRef}>
            <SectionTitle>GitHub Activity</SectionTitle>
            <GitHubActivity username="edudouraado" profileUrl={DATA.github} />
          </section>

          {/* ═══ FOOTER ═══ */}
          <footer className="text-center pt-8 border-t border-[var(--color-border)]">
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} <span className="text-[var(--color-primary)]">{DATA.name}</span> — Feito com React & Tailwind CSS
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}

/* ─── SOCIAL LINK ─── */
function SocialLink({ href, icon, label, download }) {
  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel="noopener noreferrer"
      download={download}
      className="flex items-center gap-3 font-mono font-medium text-[var(--color-text-primary)]
                 hover:text-[var(--color-text-secondary)] transition-colors group"
    >
      {icon}
      <span className="text-lg">{label}</span>
    </a>
  );
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ proj }) {
  return (
    <div className="group bg-[var(--color-card-background)] border border-[var(--color-border)]
                    overflow-hidden hover:shadow-[0_8px_40px_rgba(0,255,170,0.06)]
                    transition-all duration-500 hover:border-[var(--color-accent)]/50
                    rounded-2xl flex flex-col min-h-[280px]">
      {/* Header colorido */}
      <div className="w-full h-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-transparent" />

      <div className="p-6 flex flex-col flex-grow">
        {/* Status + tipo + data */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono
                          text-[var(--color-text-primary)] px-2 py-1
                          bg-[var(--color-card-background)]/80 rounded-full border border-[var(--color-border)]">
            <span className={`w-2 h-2 rounded-full ${proj.statusColor} animate-pulse`} />
            {proj.status}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)]">
            <span>{proj.type}</span>
            <span className="opacity-50">•</span>
            <span>{proj.date}</span>
          </div>
        </div>

        {/* Nome */}
        <h3 className="text-2xl font-bold font-mono text-[var(--color-text-primary)]
                       group-hover:text-[var(--color-accent)] transition-colors mb-3">
          {proj.name}
        </h3>

        {/* Descrição */}
        <p className="text-[var(--color-text-secondary)] text-sm font-mono leading-relaxed mb-4 flex-grow">
          {proj.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {proj.tech.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 font-mono
              bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)]
              rounded-md border border-[var(--color-border)]">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="border-t border-[var(--color-border)] pt-4 flex gap-4">
          {proj.link && (
            <a href={proj.link} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-sm font-mono font-medium
                          text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors group/link">
              <FiExternalLink className="w-4 h-4" />
              <span>Website</span>
              <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200">→</span>
            </a>
          )}
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 text-sm font-mono font-medium
                          text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}