/* Sockbuster — RF04: gestión de reseñas de fanáticos
   Ficha del producto con valoraciones de 1 a 5 estrellas y comentarios. */

let estrellasNuevas = 0;
let productoEnFicha = null;

function abrirFicha(id) {
  const p = POR_ID.get(id);
  productoEnFicha = id;
  estrellasNuevas = 0;

  const lista = RESENAS[id] || [];
  const { promedio, total } = estrellasDe(id);

  document.getElementById('vista-ficha').innerHTML = `
    <div class="ficha-foto">${calcetin(p, '-ficha')}</div>
    <div>
      <span class="producto-col">${p.coleccion}</span>
      <h3 style="font-size:24px;margin:4px 0 2px">${p.nombre}</h3>
      <p class="producto-peli" style="display:block">${p.pelicula}</p>
      <p class="estrellas" style="margin:8px 0 0">
        ${dibujarEstrellas(promedio)}
        <small>${promedio.toFixed(1)} de 5 · ${total} reseña${total === 1 ? '' : 's'}</small>
      </p>
      <p class="precio" style="margin:10px 0 0">${precio(p.precio)}</p>
    </div>

    <div>
      <p class="titulo-seccion" style="margin-bottom:8px">Stock por talla</p>
      <div class="tallas">
        ${TALLAS.map(t => `<span class="talla" style="cursor:default;${p.stock[t] === 0 ? 'opacity:.3;text-decoration:line-through' : ''}">${t}: ${p.stock[t]}</span>`).join('')}
      </div>
    </div>

    <div>
      <p class="titulo-seccion" style="margin-bottom:10px">Reseñas de fanáticos</p>
      <div style="display:grid;gap:14px" id="lista-resenas">
        ${lista.length ? lista.map(r => `
          <div class="resena">
            <div class="resena-cab">
              <span class="resena-aut">${r.autor}</span>
              <span class="estrellas">${dibujarEstrellas(r.estrellas)}</span>
            </div>
            <p>${r.texto}</p>
          </div>`).join('') : '<p style="color:var(--texto-suave);font-size:14px;margin:0">Todavía no hay reseñas de este modelo.</p>'}
      </div>
    </div>

    <form id="form-resena" style="display:grid;gap:10px;border-top:1px solid var(--linea);padding-top:16px">
      <p class="titulo-seccion" style="margin:0">Deja tu valoración</p>
      <div class="campo">
        <label id="eti-estrellas">Tu puntuación</label>
        <div class="sel-estrellas" role="group" aria-labelledby="eti-estrellas">
          ${[1,2,3,4,5].map(n => `<button type="button" data-estrella="${n}" aria-label="${n} estrella${n === 1 ? '' : 's'}">★</button>`).join('')}
        </div>
      </div>
      <div class="campo">
        <label for="r-autor">Tu nombre</label>
        <input id="r-autor" required>
      </div>
      <div class="campo">
        <label for="r-texto">Tu comentario</label>
        <input id="r-texto" required>
      </div>
      <p id="error-resena" style="color:var(--cinta);font-size:13px;margin:0" hidden>Elige una puntuación de 1 a 5 estrellas.</p>
      <button class="anadir" type="submit" style="width:100%;padding:11px">Publicar reseña</button>
    </form>`;

  /* selector de estrellas */
  const selector = document.querySelectorAll('[data-estrella]');
  for (const b of selector) {
    b.addEventListener('click', () => {
      estrellasNuevas = Number(b.dataset.estrella);
      for (const otro of selector) {
        otro.classList.toggle('activa', Number(otro.dataset.estrella) <= estrellasNuevas);
      }
      document.getElementById('error-resena').hidden = true;
    });
  }

  document.getElementById('form-resena').addEventListener('submit', e => {
    e.preventDefault();
    if (estrellasNuevas === 0) {
      document.getElementById('error-resena').hidden = false;
      return;
    }
    const autor = document.getElementById('r-autor').value.trim();
    const texto = document.getElementById('r-texto').value.trim();
    if (!RESENAS[productoEnFicha]) RESENAS[productoEnFicha] = [];
    RESENAS[productoEnFicha].unshift({ autor, estrellas: estrellasNuevas, texto });
    pintarCatalogo();
    abrirFicha(productoEnFicha);
  });

  mostrarVista('ficha');
  abrirPanel();
}
