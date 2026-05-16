// ---------- Nav scroll + mobile toggle ----------
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---------- Particles ----------
const p = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const dot = document.createElement('span');
  dot.className = 'particle';
  dot.style.left = Math.random() * 100 + '%';
  dot.style.animationDuration = (6 + Math.random() * 10) + 's';
  dot.style.animationDelay = (Math.random() * 8) + 's';
  const s = 2 + Math.random() * 5;
  dot.style.width = dot.style.height = s + 'px';
  dot.style.opacity = 0.3 + Math.random() * 0.6;
  p.appendChild(dot);
}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Counters ----------
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => { cur += step; if (cur >= target) { el.textContent = target + '+'; } else { el.textContent = cur; requestAnimationFrame(tick); } };
    tick();
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// ---------- Lightbox ----------
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = '<img alt="preview">';
document.body.appendChild(lb);
const lbImg = lb.querySelector('img');
document.querySelectorAll('.masonry img').forEach(img => {
  img.addEventListener('click', () => { lbImg.src = img.src; lb.classList.add('open'); });
});
lb.addEventListener('click', () => lb.classList.remove('open'));

// ---------- Booking form ----------
const form = document.getElementById('bookingForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const msg = `Booking Request:\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEvent: ${data.get('event')}\nDate: ${data.get('date')}\nVenue: ${data.get('venue')}\nMessage: ${data.get('message') || '-'}`;
  const wa = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  note.textContent = '✓ Opening WhatsApp to confirm your booking...';
  setTimeout(() => window.open(wa, '_blank'), 600);
  form.reset();
});

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();
