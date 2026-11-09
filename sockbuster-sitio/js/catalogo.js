/* Sockbuster — RF01: catálogo por colecciones temáticas
   Dibuja la rejilla de productos, los filtros y el calcetín en SVG. */

const CLP = new Intl.NumberFormat('es-CL', { style:'currency', currency:'CLP', maximumFractionDigits:0 });
const precio = n => CLP.format(n);

const POR_ID = new Map(PRODUCTOS.map(p => [p.id, p]));

/* --- el calcetín dibujado, sin imágenes externas --- */
const SILUETA = 'M68 24 L136 24 L136 118 Q136 139 118 147 L58 172 Q36 181 28 161 Q21 142 40 133 L77 115 Q87 110 87 98 L87 24 Z';

const PATRONES = {
  estrellas: c => [[52,60],[104,46],[74,92],[118,86],[46,116],[96,124]]
    .map(([x,y]) => `<path d="M${x} ${y-7}l2 5l5 2l-5 2l-2 5l-2-5l-5-2l5-2z" fill="${c}"/>`).join(''),
  lluvia: c => Array.from({length:14}, (_,i) =>
    `<line x1="${34+i*9}" y1="40" x2="${26+i*9}" y2="168" stroke="${c}" stroke-width="1.6" opacity=".7"/>`).join(''),
  ondas: c => Array.from({length:6}, (_,i) =>
    `<path d="M20 ${54+i*20} q16 -9 32 0 t32 0 t32 0 t32 0" fill="none" stroke="${c}" stroke-width="2.4"/>`).join(''),
  sierra: c => Array.from({length:5}, (_,i) =>
    `<path d="M20 ${58+i*24} l12 -9 l12 9 l12 -9 l12 9 l12 -9 l12 9 l12 -9 l12 9" fill="none" stroke="${c}" stroke-width="2.4"/>`).join(''),
  picos: c => Array.from({length:4}, (_,i) =>
    `<path d="M${26+i*4} ${150-i*26} l22 -22 l22 22 z" fill="${c}" opacity="${0.9-i*0.15}"/>`).join(''),
  rayas: c => Array.from({length:8}, (_,i) =>
    `<rect x="${24+i*16}" y="18" width="6" height="160" fill="${c}" opacity=".85"/>`).join(''),
  rombos: c => [[58,56],[104,56],[81,90],[58,124],[104,124],[81,158]]
    .map(([x,y]) => `<path d="M${x} ${y-13}l11 13l-11 13l-11-13z" fill="${c}"/>`).join(''),
  lunares: c => [[54,54],[100,66],[70,100],[116,104],[48,134],[94,140]]
    .map(([x,y]) => `<circle cx="${x}" cy="${y}" r="10" fill="${c}"/>`).join('')
};

function calcetin(p, sufijo = '') {
  const cid = `rec-${p.id}${sufijo}`;
  return `<svg viewBox="0 0 170 196" role="img" aria-label="Calcetín ${p.nombre}, colección ${p.coleccion}">
    <defs><clipPath id="${cid}"><path d="${SILUETA}"/></clipPath></defs>
    <path d="${SILUETA}" fill="${p.base}"/>
    <g clip-path="url(#${cid})">${PATRONES[p.patron](p.acento)}</g>
    <rect x="60" y="24" width="84" height="16" fill="${p.acento}" clip-path="url(#${cid})"/>
    <path d="${SILUETA}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
  </svg>`;
}

/* --- estado de la vista --- */
const tallaElegida = new Map(
  PRODUCTOS.map(p => [p.id, TALLAS.find(t => p.stock[t] > 0) || 'M'])
);
let coleccionActiva = 'todas';

const stockTotal = p => TALLAS.reduce((s, t) => s + p.stock[t], 0);

function estrellasDe(id) {
  const lista = RESENAS[id] || [];
  if (!lista.length) return { promedio: 0, total: 0 };
  const suma = lista.reduce((s, r) => s + r.estrellas, 0);
  return { promedio: suma / lista.length, total: lista.length };
}

const dibujarEstrellas = n => '★★★★★'.slice(0, Math.round(n)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(n));

function tarjeta(p) {
  const t = tallaElegida.get(p.id);
  const total = stockTotal(p);
  const { promedio, total: cuantas } = estrellasDe(p.id);
  return `<article class="producto">
    <div class="producto-foto">
      ${total <= 6 ? '<span class="sello">Últimas unidades</span>' : ''}
      ${calcetin(p)}
    </div>
    <div class="producto-cuerpo">
      <span class="producto-col">${p.coleccion}</span>
      <h3>${p.nombre}</h3>
      <p class="producto-peli">${p.pelicula}</p>
      <p class="estrellas">${dibujarEstrellas(promedio)}<small>${cuantas} reseña${cuantas === 1 ? '' : 's'}</small></p>
      <div class="tallas" role="group" aria-label="Talla de ${p.nombre}">
        ${TALLAS.map(x => `<button class="talla" data-producto="${p.id}" data-talla="${x}"
          aria-pressed="${t === x}" ${p.stock[x] === 0 ? 'disabled title="Sin stock"' : ''}>${x}</button>`).join('')}
      </div>
      <p class="stock ${p.stock[t] <= 2 ? 'poco' : ''}">Stock talla ${t}: ${p.stock[t]} unidades</p>
      <div class="producto-pie">
        <span class="precio">${precio(p.precio)}</span>
        <button class="anadir" data-anadir="${p.id}">Agregar</button>
      </div>
      <button class="ver-mas" data-ficha="${p.id}">Ver ficha y reseñas</button>
    </div>
  </article>`;
}

const rejilla = document.getElementById('rejilla-productos');

function pintarCatalogo() {
  rejilla.innerHTML = PRODUCTOS
    .filter(p => coleccionActiva === 'todas' || p.coleccion === coleccionActiva)
    .map(tarjeta).join('');
}

/* --- filtros por colección (RF01) --- */
const filtros = [...document.querySelectorAll('.filtro')];
for (const f of filtros) {
  f.addEventListener('click', () => {
    if (coleccionActiva === f.dataset.coleccion) return;
    for (const otro of filtros) otro.setAttribute('aria-pressed', String(otro === f));
    coleccionActiva = f.dataset.coleccion;
    pintarCatalogo();
  });
}

/* --- clics dentro de la rejilla --- */
rejilla.addEventListener('click', e => {
  const btnTalla = e.target.closest('.talla');
  if (btnTalla) {
    const id = Number(btnTalla.dataset.producto);
    tallaElegida.set(id, btnTalla.dataset.talla);
    pintarCatalogo();
    return;
  }
  const btnAnadir = e.target.closest('[data-anadir]');
  if (btnAnadir) { agregarAlCarrito(Number(btnAnadir.dataset.anadir)); return; }

  const btnFicha = e.target.closest('[data-ficha]');
  if (btnFicha) abrirFicha(Number(btnFicha.dataset.ficha));
});

pintarCatalogo();
