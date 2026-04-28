const header = document.getElementById('site-header');
const fades = document.querySelectorAll('.fade-up');
const parallaxElements = document.querySelectorAll('.parallax');
const tilts = document.querySelectorAll('.tilt');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);

fades.forEach((el) => observer.observe(el));

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
  const offset = window.scrollY * 0.06;
  parallaxElements.forEach((el, idx) => {
    const direction = idx % 2 === 0 ? 1 : -1;
    el.style.setProperty('--offset', `${offset * direction}px`);
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const heroVisual = document.querySelector('.hero-visual');
heroVisual?.addEventListener('pointermove', (event) => {
  const rect = heroVisual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  tilts.forEach((el, index) => {
    const intensity = (index + 1) * 4;
    el.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(${index * 6}px)`;
  });
});

heroVisual?.addEventListener('pointerleave', () => {
  tilts.forEach((el) => {
    el.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
});
