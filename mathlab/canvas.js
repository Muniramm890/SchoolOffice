// mathlab/canvas.js
// Professional node-network animation, orange-tinted, drawn only
// inside the dark hero band (#labCanvas), matching the brand's
// restrained motion language rather than a busy/playful effect.
(function () {
  const canvas = document.getElementById('labCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const band = canvas.closest('.lab-hero-band');
  let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [];

  function resize() {
    const rect = band.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(46, Math.round((w * h) / 26000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1 + Math.random() * 1.4
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function tick() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(232,96,10,${0.14 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,178,91,0.55)';
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
