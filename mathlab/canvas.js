// mathlab/canvas.js
// Floating math-symbol animation, drawn inside the header only.
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return; // header not injected yet / not found — skip safely

  const ctx = canvas.getContext('2d');
  const header = canvas.closest('.lab-header');

  function resizeCanvas() {
    const rect = header.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const symbols = ['π', '∫', '∑', '∞', '√', 'θ', 'Δ', 'Ω'];
  const particles = [];

  class MathParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      this.size = Math.random() * 16 + 10;
      this.speedY = Math.random() * 0.6 + 0.15;
      this.opacity = Math.random() * 0.25 + 0.08;
    }
    update() {
      this.y -= this.speedY;
      if (this.y < -30) this.reset(false);
    }
    draw() {
      ctx.fillStyle = `rgba(255, 178, 91, ${this.opacity})`; // orange-light with opacity
      ctx.font = `${this.size}px sans-serif`;
      ctx.fillText(this.symbol, this.x, this.y);
    }
  }

  for (let i = 0; i < 24; i++) particles.push(new MathParticle());

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
})();
