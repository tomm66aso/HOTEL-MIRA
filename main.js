/* ============================================================
   Hotel Ristorante Mira — main.js
   ============================================================ */

// ── nav scroll ────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('toTop').classList.toggle('vis', window.scrollY > 400);
}, { passive: true });

// ── mobile menu ───────────────────────────────────────────
const burger = document.getElementById('burger');
const menu   = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
});

// ── reveal on scroll ─────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-img').forEach(el => io.observe(el));

// Hero elements: trigger immediately (no observer needed)
document.querySelectorAll('.hero__inner .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('in'), 200 + i * 130);
});

// ── footer year ───────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── booking form ─────────────────────────────────────────
const form   = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

const CONFIGURED = window.SUPABASE_URL && !window.SUPABASE_URL.includes('INCOLLA');

let sb;
if (CONFIGURED && window.supabase) {
  sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const data = {
    nome:      form.nome.value.trim(),
    email:     form.email.value.trim(),
    telefono:  form.telefono.value.trim() || null,
    ospiti:    parseInt(form.ospiti.value) || null,
    arrivo:    form.arrivo.value   || null,
    partenza:  form.partenza.value || null,
    camera:    form.camera.value,
    messaggio: form.messaggio.value.trim() || null,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Invio in corso…';
  status.textContent = '';
  status.className = 'form__status';

  if (sb) {
    // ── Supabase path ─────────────────────────────────────
    const { error } = await sb.from('prenotazioni').insert(data);
    if (error) {
      status.textContent = 'Si è verificato un errore. Riprova o scrivi a info@hotelmira.com';
      status.className = 'form__status err';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Invia la richiesta';
    } else {
      status.textContent = '✓ Richiesta inviata! Vi risponderemo entro 24 ore.';
      status.className = 'form__status ok';
      form.reset();
      submitBtn.textContent = 'Inviato ✓';
    }
  } else {
    // ── mailto fallback (Supabase non configurato) ────────
    const body = encodeURIComponent(
      `Nome: ${data.nome}\nEmail: ${data.email}\nTelefono: ${data.telefono||'—'}\n`+
      `Arrivo: ${data.arrivo||'—'}  Partenza: ${data.partenza||'—'}\n`+
      `Ospiti: ${data.ospiti||'—'}  Tipologia: ${data.camera}\n\n${data.messaggio||''}`
    );
    window.location.href = `mailto:info@hotelmira.com?subject=Richiesta%20preventivo%20-%20${encodeURIComponent(data.nome)}&body=${body}`;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Invia la richiesta';
  }
});
