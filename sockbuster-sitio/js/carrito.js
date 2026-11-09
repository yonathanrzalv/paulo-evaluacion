/* Sockbuster — RF02: carrito y gestión de pedidos
   Agregar, modificar cantidades, checkout simulado y folio del pedido. */

const DESPACHO = 3990;
const DESPACHO_GRATIS = 35000;

let carrito = [];
try {
  const guardado = localStorage.getItem('sockbuster-carrito');
  if (guardado) carrito = JSON.parse(guardado).filter(l =>
    POR_ID.has(l.id) && TALLAS.includes(l.talla) && Number.isInteger(l.cantidad) && l.cantidad > 0);
} catch (e) { carrito = []; }

const guardar = () => {
  try { localStorage.setItem('sockbuster-carrito', JSON.stringify(carrito)); } catch (e) {}
};

const $ = id => document.getElementById(id);
const panel = $('panel'), velo = $('velo'), botonCarrito = $('abrir-carrito');
const vistaFicha = $('vista-ficha'), vistaCarrito = $('vista-carrito');
const vistaFormulario = $('vista-formulario'), vistaListo = $('vista-listo'), totales = $('totales');

/* --- cambio de vista dentro del panel --- */
function mostrarVista(cual) {
  vistaFicha.hidden = cual !== 'ficha';
  vistaCarrito.hidden = cual !== 'carrito';
  vistaFormulario.hidden = cual !== 'formulario';
  vistaListo.hidden = cual !== 'listo';
  $('panel-titulo').textContent =
    cual === 'ficha' ? 'Ficha del producto' :
    cual === 'formulario' ? 'Datos de envío' :
    cual === 'listo' ? 'Listo' : 'Tu carrito';
  pintarTotales();
}

/* --- abrir y cerrar --- */
let abierto = false;
function abrirPanel() {
  if (abierto) return;
  abierto = true;
  velo.classList.add('abierto');
  panel.classList.add('abierto');
  $('cerrar-panel').focus({ preventScroll: true });
}
function cerrarPanel() {
  if (!abierto) return;
  abierto = false;
  velo.classList.remove('abierto');
  panel.classList.remove('abierto');
  botonCarrito.focus({ preventScroll: true });
}
botonCarrito.addEventListener('click', () => { mostrarVista('carrito'); abrirPanel(); });
$('cerrar-panel').addEventListener('click', cerrarPanel);
velo.addEventListener('click', cerrarPanel);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && abierto) cerrarPanel(); });

/* --- agregar al carrito --- */
function agregarAlCarrito(id) {
  const talla = tallaElegida.get(id);
  const producto = POR_ID.get(id);
  if (producto.stock[talla] === 0) return;

  const existente = carrito.find(l => l.id === id && l.talla === talla);
  if (existente) existente.cantidad++;
  else carrito.push({ id, talla, cantidad: 1 });

  guardar();
  pintarCarrito();
  mostrarVista('carrito');
  abrirPanel();
}

/* --- totales --- */
function pintarTotales() {
  let unidades = 0, subtotal = 0;
  for (const l of carrito) {
    unidades += l.cantidad;
    subtotal += POR_ID.get(l.id).precio * l.cantidad;
  }
  $('contador').textContent = unidades;

  const envio = subtotal >= DESPACHO_GRATIS ? 0 : DESPACHO;
  $('subtotal').textContent = precio(subtotal);
  $('despacho').textContent = envio ? precio(envio) : 'Gratis';
  $('total').textContent = precio(subtotal + envio);

  /* los totales solo acompañan a la lista del carrito, nunca a la ficha
     ni al formulario de pago */
  totales.hidden = !carrito.length || vistaCarrito.hidden;
}

/* --- lista del carrito --- */
function pintarCarrito() {
  if (!carrito.length) {
    vistaCarrito.innerHTML = '<p class="vacio">Tu carrito está vacío.<br>Elige un modelo del catálogo para empezar.</p>';
  } else {
    vistaCarrito.innerHTML = carrito.map((l, i) => {
      const p = POR_ID.get(l.id);
      return `<div class="linea">
        ${calcetin(p, `-c${i}`)}
        <div>
          <div class="linea-nom">${p.nombre}</div>
          <div class="linea-det">Talla ${l.talla} · ${precio(p.precio)} c/u</div>
          <div class="cantidad">
            <button data-paso="-1" data-linea="${i}" aria-label="Quitar una unidad de ${p.nombre} talla ${l.talla}">−</button>
            <span>${l.cantidad}</span>
            <button data-paso="1" data-linea="${i}" aria-label="Agregar una unidad de ${p.nombre} talla ${l.talla}">+</button>
          </div>
        </div>
        <div class="linea-sub">${precio(p.precio * l.cantidad)}</div>
      </div>`;
    }).join('');
  }
  pintarTotales();
}

vistaCarrito.addEventListener('click', e => {
  const boton = e.target.closest('[data-paso]');
  if (!boton) return;
  const i = Number(boton.dataset.linea);
  carrito[i].cantidad += Number(boton.dataset.paso);
  if (carrito[i].cantidad < 1) carrito.splice(i, 1);
  guardar();
  pintarCarrito();
});

/* --- checkout simulado con folio (RF02) --- */
$('ir-a-pagar').addEventListener('click', () => mostrarVista('formulario'));

vistaFormulario.addEventListener('submit', e => {
  e.preventDefault();

  /* descuenta el stock solo después de confirmar el pago */
  for (const l of carrito) {
    const p = POR_ID.get(l.id);
    p.stock[l.talla] = Math.max(0, p.stock[l.talla] - l.cantidad);
  }

  const folio = 'SB-' + String(Math.floor(1000 + Math.random() * 9000));
  $('folio').textContent = 'Pedido ' + folio;

  carrito = [];
  guardar();
  pintarCatalogo();
  pintarCarrito();
  mostrarVista('listo');
});

$('seguir').addEventListener('click', () => {
  vistaFormulario.reset();
  mostrarVista('carrito');
  cerrarPanel();
});

pintarCarrito();
