// 1. Cerrar menú móvil al pulsar un enlace
const menuToggle = document.getElementById('menu');
document.querySelectorAll('.navbar a').forEach((a) =>
  a.addEventListener('click', () => (menuToggle.checked = false))
);

// 2. Enlace activo según scroll
const enlaces = document.querySelectorAll('.navbar a');
const secciones = [...enlaces]
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const obsActivo = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        enlaces.forEach((a) =>
          a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id)
        );
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
secciones.forEach((s) => obsActivo.observe(s));

// 3. "Elegir plan" prellena el formulario
const planSelect = document.getElementById('plan-select');
document.querySelectorAll('.btn-plan').forEach((btn) =>
  btn.addEventListener('click', () => {
    planSelect.value = btn.dataset.plan;
  })
);

// 4. Calculadora IMC
const imcForm = document.getElementById('imc-form');
const imcOut = document.getElementById('imc-resultado');
imcForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const peso = parseFloat(document.getElementById('peso').value);
  const alturaM = parseFloat(document.getElementById('altura').value) / 100;
  if (!peso || !alturaM || peso < 20 || peso > 300 || alturaM < 1 || alturaM > 2.5) {
    imcOut.textContent = 'Introduce un peso (20-300 kg) y una altura (100-250 cm) válidos.';
    return;
  }
  const imc = peso / (alturaM * alturaM);
  let cat = 'Obesidad';
  if (imc < 18.5) cat = 'Bajo peso';
  else if (imc < 25) cat = 'Peso normal';
  else if (imc < 30) cat = 'Sobrepeso';
  imcOut.textContent = `Tu IMC es ${imc.toFixed(1)} (${cat}). Es una referencia orientativa, no un diagnóstico.`;
});

// 5. Animación al hacer scroll (respeta reduced-motion)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reduce || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('visible'));
} else {
  const obsReveal = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => obsReveal.observe(el));
}