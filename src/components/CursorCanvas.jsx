import { useEffect, useRef } from 'react';

/* ─── CURSOR CUSTOMIZADO ───
   Recria o cursor do site modelo: anel branco, ponto central verde e dois
   arcos girando ao redor. Ao clicar, emite uma onda de pulso a partir do
   ponto clicado. (O CSS já esconde o cursor nativo com `cursor: none`.) */
export default function CursorCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    const mouse = { x: -1000, y: -1000, active: false };
    let pulses = [];

    class Pulse {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.life = 1;
      }
      update() {
        this.r += 4;
        this.life -= 0.02;
      }
      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 200, ${this.life})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseDown = (e) => {
      pulses.push(new Pulse(e.clientX, e.clientY));
      if (pulses.length > 10) pulses.shift();
    };
    const onMouseOut = (e) => {
      if (!e.relatedTarget) {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseout', onMouseOut);

    const drawCursor = () => {
      if (!mouse.active) return;
      const { x, y } = mouse;

      // Anel externo
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Ponto central
      ctx.fillStyle = '#0f0';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();

      // Dois arcos girando ao redor do anel
      const spin = 0.002 * Date.now();
      ctx.beginPath();
      ctx.arc(x, y, 24, spin, spin + Math.PI / 2);
      ctx.strokeStyle = 'rgba(0, 255, 170, 0.5)';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 24, spin + Math.PI, spin + 1.5 * Math.PI);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ondas de pulso dos cliques
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update();
        pulses[i].draw();
        if (pulses[i].life <= 0) pulses.splice(i, 1);
      }

      drawCursor();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}

