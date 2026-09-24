import { useState, useEffect } from 'react';
import { FiMail, FiDatabase, FiTerminal, FiLayout, FiUser, FiFileText, FiCode, FiMoon, FiSun, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function App() {
  const [activeTab, setActiveTab] = useState('sobre');
  const [isDark, setIsDark] = useState(true);

  // Aplica o tema escuro/claro
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const projetos = [
    { 
      nome: "Auditoria de Estoque", 
      desc: "API REST Serverless (FastAPI) para cruzamento de notas fiscais com conferências físicas.", 
      tech: "Python, FastAPI, PostgreSQL", 
      icon: <FiDatabase className="w-6 h-6 text-primary" /> 
    },
    { 
      nome: "Conversão e Giro", 
      desc: "Modelagem analítica cruzando transferências com vendas do PDV via subconsultas otimizadas.", 
      tech: "SQL Avançado, PostgreSQL", 
      icon: <FiTerminal className="w-6 h-6 text-primary" /> 
    },
    { 
      nome: "Automação Fiscal", 
      desc: "Parsing massivo de notas (XML) para rastreabilidade de lotes e mitigação de validades.", 
      tech: "Python, Pandas, XML", 
      icon: <FiTerminal className="w-6 h-6 text-primary" /> 
    },
    { 
      nome: "Plataforma Openest", 
      desc: "Aplicação social web com feed dinâmico e sistema de moderação visual via React Portals.", 
      tech: "React, Node.js", 
      icon: <FiLayout className="w-6 h-6 text-primary" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-500 selection:bg-primary selection:text-white pb-16">
      
      {/* Top Bar - Modo Claro / Escuro */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-6 flex justify-end">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary group"
          title="Alternar Tema"
        >
          {isDark ? <FiSun size={20} className="group-hover:rotate-90 transition-transform duration-300" /> : <FiMoon size={20} className="group-hover:-rotate-12 transition-transform duration-300" />}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12 mt-6 animate-fade-in">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative">
          
          <div className="relative group">
            <div className="absolute inset-0 bg-primary opacity-20 rounded-full blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
            <img 
              src="https://github.com/edudouraado.png" 
              alt="Eduardo Dourado" 
              className="relative w-36 h-36 rounded-full object-cover shadow-lg border-2 border-white dark:border-slate-800 z-10"
            />
            <div className="absolute -bottom-2 right-2 z-20 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md transform rotate-6 border border-white dark:border-slate-800 tracking-wider">
              JÚNIOR
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <p className="text-primary font-bold tracking-wider text-sm mb-1 uppercase">
                Olá, eu sou o
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Eduardo Dourado
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium mt-1">
                <strong className="text-primary dark:text-blue-400">Desenvolvedor Júnior</strong> | Analista de Dados
              </p>
            </div>
            
            {/* Contatos Sociais Elegantes */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a href="https://wa.me/5561983439617" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400 transition-all hover:scale-105">
                <FaWhatsapp size={16} /> (61) 98343-9617
              </a>
              <a href="https://instagram.com/edudouraado" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 dark:bg-pink-500/10 dark:border-pink-500/20 dark:text-pink-400 transition-all hover:scale-105">
                <FaInstagram size={16} /> @edudouraado
              </a>
              <a href="https://linkedin.com/in/eduardodouradosdo" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400 transition-all hover:scale-105">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <a href="https://github.com/edudouraado" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 transition-all hover:scale-105">
                <FaGithub size={16} /> GitHub
              </a>
            </div>
          </div>
        </header>

        {/* Abas Minimalistas */}
        <nav className="flex justify-center md:justify-start">
          <div className="flex p-1 space-x-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl">
            {[
              { id: 'sobre', label: 'Sobre Mim', icon: <FiUser /> },
              { id: 'curriculo', label: 'Currículo', icon: <FiFileText /> },
              { id: 'portfolio', label: 'Portfólio', icon: <FiCode /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2.5 px-5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm transform scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Conteúdo das Abas */}
        <main className="animate-slide-up min-h-[400px]">
          
          {/* ABA 1: SOBRE MIM */}
          {activeTab === 'sobre' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiTerminal className="text-primary" /> Minha trajetória
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  Sou um Desenvolvedor Júnior em transição para a área de Tecnologia, combinando uma base analítica (graduado em Direito) com ampla experiência prática em operações, auditoria e gestão de estoque no varejo farmacêutico. 
                  <br/><br/>
                  Cursando Análise e Desenvolvimento de Sistemas na UNIFOR, meu foco é aplicar minha visão estratégica de negócios na criação de soluções eficientes e automação de processos através de código limpo.
                </p>
                
                {/* Janela de Terminal feita com CSS */}
                <div className="mt-6 rounded-xl bg-[#1e1e1e] border border-slate-700 overflow-hidden shadow-lg">
                  <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-400 text-xs ml-2 font-mono">bash - edudouraado</span>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    <p className="text-green-400">➜ <span className="text-blue-400">~</span> ./start_journey.sh</p>
                    <p className="text-slate-300 mt-1">&gt; Iniciando ambiente de desenvolvimento...</p>
                    <p className="text-slate-300">&gt; Carregando módulos Python e SQL...</p>
                    <p className="text-slate-300">&gt; Inicializando servidor React...</p>
                    <p className="text-primary mt-2">Status: Ready to code <span className="animate-pulse">_</span></p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <FiDatabase className="text-primary" /> Hard Skills
                  </h3>
                  <ul className="space-y-3">
                    {['Python & FastAPI', 'SQL Avançado & PostgreSQL', 'React & Node.js', 'Pandas & Automações'].map(skill => (
                      <li key={skill} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <FiCheckCircle className="text-primary" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a href="mailto:edusalesoliveira@hotmail.com" className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-md shadow-primary/20 hover:-translate-y-1 w-full">
                  <FiMail size={18} /> Iniciar Conversa
                </a>
              </div>
            </div>
          )}

          {/* ABA 2: CURRÍCULO */}
          {activeTab === 'curriculo' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiFileText className="text-primary" /> Documento Oficial
                </h2>
                <a href="/curriculo.pdf" download="Eduardo_Dourado_Curriculo.pdf" className="flex items-center gap-2 text-sm font-bold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <FiDownload /> Salvar PDF
                </a>
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-900 relative">
                <iframe 
                  src="/curriculo.pdf" 
                  title="Currículo Eduardo Dourado"
                  className="w-full h-[600px] md:h-[750px] relative z-10"
                />
              </div>
            </div>
          )}

          {/* ABA 3: PORTFÓLIO */}
          {activeTab === 'portfolio' && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCode className="text-primary" /> Meus Projetos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projetos.map((proj, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-md flex flex-col h-full relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>

                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-primary">
                        {proj.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{proj.nome}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed relative z-10">{proj.desc}</p>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg self-start relative z-10">
                      {proj.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}