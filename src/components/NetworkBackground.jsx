import { useEffect, useRef } from 'react';

/* ─── FONDO DE CONSTELAÇÃO INTERATIVO ───
   Recria o efeito do site modelo (Aptifolio): partículas em formato de cruz
   espalhadas pelo fundo. As ligações entre elas SÓ se formam na região
   próxima ao mouse — quanto mais perto, mais forte a linha. O mouse também
   repele levemente as partículas, dando vida à constelação. */
const CONFIG = {
  connectionRadius: 140,   // raio máximo de ligação com o mouse
  mouseRepelRadius: 100,   // raio em que o mouse empurra as partículas
  baseColor: 'rgba(0, 255, 170, 0.4)',
  activeColor: 'rgba(0, 255, 200, 1)',
  scanSpeed: 0.5,          // velocidade de deriva das partículas
  density: 9000,           // 1 partícula a cada 9.000px² de tela
};

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -1000, y: -1000, active: false };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * CONFIG.scanSpeed;
        this.vy = (Math.random() - 0.5) * CONFIG.scanSpeed;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebater nas bordas
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        else if (this.x > width) { this.x = width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        else if (this.y > height) { this.y = height; this.vy *= -1; }

        // Repulsão do mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRepelRadius && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (CONFIG.mouseRepelRadius - dist) / CONFIG.mouseRepelRadius;
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }

      draw() {
        // Partícula em formato de cruz (igual ao site modelo)
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x - s, this.y);
        ctx.lineTo(this.x + s, this.y);
        ctx.moveTo(this.x, this.y - s);
        ctx.lineTo(this.x, this.y + s);

        // Brilha quando o mouse está por perto
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const near = Math.sqrt(dx * dx + dy * dy) < CONFIG.connectionRadius;
        ctx.strokeStyle = near ? CONFIG.activeColor : CONFIG.baseColor;
        ctx.lineWidth = near ? 1.5 : 0.8;
        ctx.stroke();
      }
    }

    const spawnParticles = () => {
      const count = Math.floor((width * height) / CONFIG.density);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      spawnParticles();
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseOut = (e) => {
      if (!e.relatedTarget) {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);

    /* Ligações: partículas próximas entre si E ligação partícula→mouse,
       ambas apenas dentro da zona de influência do cursor. */
    const drawConnections = () => {
      const linkRadius = 0.6 * CONFIG.connectionRadius;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mouseDist >= CONFIG.connectionRadius) continue;

        // Ligação partícula ↔ partícula
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < linkRadius) {
            const alpha = 1 - dist / linkRadius;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 255, 200, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Ligação partícula → mouse (a constelação se "acende" até o cursor)
        const alpha = 1 - mouseDist / CONFIG.connectionRadius;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0, 255, 200, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

