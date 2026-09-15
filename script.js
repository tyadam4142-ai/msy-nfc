/* ==========================================================================
   MOHAMMEDI STEEL YARD - INTERACTIVE LOGIC & VCARD GENERATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initParticleBackground();
  initAddressAccordion();
  initVCardGenerator();
});

/* 1. Loader screen dismissal */
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
  }, 1500);
}

/* 2. Steel/Metallic particle canvas */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 35);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.3 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.4 + 0.2;
      // Alternate between blue and red ambient particles
      this.color = Math.random() > 0.5 ? '30, 136, 229' : '229, 57, 53';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y < 0 || this.x < 0 || this.x > width) {
        this.reset();
        this.y = height + 10;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgb(${this.color})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* 3. Address Accordion */
function initAddressAccordion() {
  const toggleBtn = document.getElementById('toggle-address-btn');
  const addressContent = document.getElementById('address-content');

  if (!toggleBtn || !addressContent) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    addressContent.classList.toggle('open');
  });
}

/* 4. vCard Download (.vcf) */
function initVCardGenerator() {
  const saveBtn = document.getElementById('save-vcard-btn');
  if (!saveBtn) return;

  saveBtn.addEventListener('click', () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Tayab Bharmal (Mohammedi Steel Yard)',
      'N:Bharmal;Tayab;;;',
      'ORG:MOHAMMEDI STEEL YARD',
      'TITLE:Proprietor',
      'TEL;TYPE=CELL,VOICE:+919822057177',
      'TEL;TYPE=WORK,VOICE:02027491321',
      'EMAIL;TYPE=WORK:msypune@hotmail.com',
      'ADR;TYPE=WORK:;;1367, Kudalwadi, Pawarvasti, Chikhli;Pune;Maharashtra;412114;India',
      'NOTE:MOHAMMEDI STEEL YARD - Quality Steel Traders & Industrial Suppliers in Pune.',
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Tayab_Bharmal_MohammediSteelYard.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
