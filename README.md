# 💻 Portfólio Profissional | Eduardo Dourado

<p align="center">
  <b>Desenvolvedor Júnior & Analista de Dados</b><br>
  Transformando regras de negócio e operações corporativas em soluções de software eficientes.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em_Evolução-blue?style=for-the-badge&logo=appveyor" alt="Status">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38Bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

---

## 🚀 Sobre o Projeto
Este repositório contém o código-fonte do meu portfólio profissional online, desenvolvido para apresentar minha transição de carreira, trajetória analítica e projetos práticos em desenvolvimento de software e análise de dados.

O projeto foi construído com foco em **performance, design minimalista e responsividade**, contando com modo claro/escuro nativo, sistema de abas dinâmicas, visualizador de currículo integrado e uma experiência interativa com fundo animado em tempo real.

- **Deploy Oficial:** [eduardo-portfolio-alpha.vercel.app](https://eduardo-portfolio-alpha.vercel.app)

---

## ✨ Destaques Técnicos

### 🕸️ Fundo interativo em tempo real (`NetworkBackground.jsx`)
Efeito de constelação inspirado no site modelo (aptifolio), implementado do zero em `<canvas>` puro com `requestAnimationFrame`:
- Partículas em forma de **cruz** distribuídas com densidade de 1 partícula a cada 9.000px²;
- **Conexões formadas apenas próximo ao mouse** (raio de 140px), criando uma "malha" que segue o cursor;
- Linhas ligando cada partícula ao mouse e **repulsão** das partículas que se aproximam demais (raio de 100px);
- Layout recalculado automaticamente no `resize`, com desenho omitido quando a aba fica oculta (performance).

### 🖱️ Cursor customizado (`CursorCanvas.jsx`)
Substitui o cursor padrão por um elemento animado em canvas:
- Anel branco + ponto verde central (tema do portfólio);
- Dois arcos em rotação contínua ao redor do cursor;
- **Onda expansiva ao clicar** (efeito de pulso);
- Cursor some quando o mouse sai da janela e é desativado em telas de toque.

### 📊 Seção GitHub Activity (`GitHubActivity.jsx`)
Bloco que mostra a atividade real no GitHub, atualizada dinamicamente via APIs públicas (sem backend próprio):
- **Gráfico de contribuições dos últimos 12 meses** (53 semanas, estilo GitHub) com 4 níveis de intensidade, rótulos de mês e tooltip no hover;
- **Cards de estatísticas:** contribuições (12 meses), repositórios públicos e seguidores;
- Estados de **loading (skeleton)**, **erro** com link para o perfil, e link direto para o perfil no topo;
- Fontes de dados (ambas com CORS liberado):
  - `https://github-contributions-api.jogruber.de/v4/{username}` — contribuições;
  - `https://api.github.com/users/{username}` — dados do perfil.

### 📜 Certificados
Subseção na área de **Educação** listando certificações (FIAP, Fundação Bradesco, Curso em Vídeo) com ícone de conquista e link para o comprovante quando disponível.

---

## 🛠️ Tecnologias Utilizadas
- **Front-end:** React 19, Vite, JavaScript (ES6+), Tailwind CSS
- **Interatividade:** Canvas 2D + `requestAnimationFrame`, IntersectionObserver (scroll spy e animações de entrada)
- **Ícones & Estilização:** React Icons, Custom CSS Terminal
- **Dados:** APIs públicas GitHub (REST + contribuições)
- **Qualidade:** OxLint (`npm run lint`)
- **Versionamento & Deploy:** Git, GitHub, Vercel (Serverless)

---

## 📂 Principais Projetos em Destaque

1. **Auditoria de Estoque**
   - *Descrição:* API REST Serverless (FastAPI) para cruzamento de notas fiscais com conferências físicas.
   - *Techs:* Python, FastAPI, PostgreSQL.

2. **Conversão e Giro**
   - *Descrição:* Modelagem analítica cruzando transferências com vendas do PDV via subconsultas otimizadas.
   - *Techs:* SQL Avançado, PostgreSQL.

3. **Automação Fiscal**
   - *Descrição:* Parsing massivo de notas (XML) para rastreabilidade de lotes e mitigação de validades.
   - *Techs:* Python, Pandas, XML.

4. **Plataforma Openest**
   - *Descrição:* Aplicação social web com feed dinâmico e sistema de moderação visual via React Portals.
   - *Techs:* React, Node.js.

---

## 📬 Contato

- **WhatsApp:** [(61) 98343-9617](https://wa.me/5561983439617)
- **LinkedIn:** [linkedin.com/in/eduardodouradosdo](https://linkedin.com/in/eduardodouradosdo)
- **Instagram:** [@edudouraado](https://instagram.com/edudouraado)
- **E-mail:** edusalesoliveira@hotmail.com