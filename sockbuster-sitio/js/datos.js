/* Sockbuster — datos del catálogo
   Sin backend: el catálogo vive en este archivo, acorde al despliegue
   estático en GitHub Pages. */

const TALLAS = ['S', 'M', 'L', 'XL'];

const PRODUCTOS = [
  { id:1,  sku:'SB-SF-01', nombre:'Nave Nodriza',      coleccion:'Ciencia Ficción', pelicula:'La Última Órbita (1979)',  precio:8990, base:'#1B2A4A', acento:'#F5B700', patron:'estrellas', stock:{S:4,  M:7, L:5, XL:2} },
  { id:2,  sku:'SB-SF-02', nombre:'Replicante',        coleccion:'Ciencia Ficción', pelicula:'Lluvia Sintética (1982)',  precio:9490, base:'#2C1B3D', acento:'#E23E57', patron:'lluvia',    stock:{S:0,  M:3, L:6, XL:4} },
  { id:3,  sku:'SB-SF-03', nombre:'Agujero de Gusano', coleccion:'Ciencia Ficción', pelicula:'Horizonte Plegado (1997)', precio:8990, base:'#0E2A2A', acento:'#4ECDA4', patron:'ondas',     stock:{S:5,  M:5, L:2, XL:0} },

  { id:4,  sku:'SB-TE-01', nombre:'Motosierra',        coleccion:'Terror 80s',      pelicula:'Cabaña 13 (1984)',         precio:7990, base:'#3A1414', acento:'#E23E57', patron:'sierra',    stock:{S:2,  M:8, L:7, XL:3} },
  { id:5,  sku:'SB-TE-02', nombre:'Niebla Roja',       coleccion:'Terror 80s',      pelicula:'El Faro Mudo (1986)',      precio:7990, base:'#24242E', acento:'#E23E57', patron:'ondas',     stock:{S:6,  M:4, L:0, XL:1} },
  { id:6,  sku:'SB-TE-03', nombre:'Casa del Lago',     coleccion:'Terror 80s',      pelicula:'Verano Negro (1981)',      precio:8490, base:'#152A1E', acento:'#F5B700', patron:'picos',     stock:{S:3,  M:6, L:6, XL:2} },

  { id:7,  sku:'SB-DR-01', nombre:'Oficina Oval',      coleccion:'Series de Drama', pelicula:'Ala Oeste del Poder',      precio:9990, base:'#17233B', acento:'#D8D3C4', patron:'rayas',     stock:{S:1,  M:5, L:8, XL:5} },
  { id:8,  sku:'SB-DR-02', nombre:'Corona Rota',       coleccion:'Series de Drama', pelicula:'Casa Thornwood',           precio:9990, base:'#2E1B2E', acento:'#F5B700', patron:'rombos',    stock:{S:4,  M:4, L:4, XL:0} },
  { id:9,  sku:'SB-DR-03', nombre:'Bufete Nocturno',   coleccion:'Series de Drama', pelicula:'Alegato Final',            precio:8990, base:'#1C1C24', acento:'#4ECDA4', patron:'rayas',     stock:{S:7,  M:9, L:3, XL:2} },

  { id:10, sku:'SB-AN-01', nombre:'Castillo Volador',  coleccion:'Animación',       pelicula:'El Reino de Nubes (1991)', precio:7490, base:'#1E3A52', acento:'#F0ECE2', patron:'lunares',   stock:{S:8,  M:8, L:5, XL:3} },
  { id:11, sku:'SB-AN-02', nombre:'Robot Oxidado',     coleccion:'Animación',       pelicula:'Chatarra con Alma (2004)', precio:7990, base:'#3D2A14', acento:'#F5B700', patron:'rombos',    stock:{S:2,  M:2, L:6, XL:4} },
  { id:12, sku:'SB-AN-03', nombre:'Zorro de Papel',    coleccion:'Animación',       pelicula:'Origami (2012)',           precio:7490, base:'#4A2410', acento:'#F0ECE2', patron:'picos',     stock:{S:5,  M:7, L:7, XL:1} }
];

/* Reseñas iniciales de fanáticos (RF04) */
const RESENAS = {
  1:  [ {autor:'Camila R.',   estrellas:5, texto:'El azul es mucho más profundo que en la foto. Me duraron dos inviernos sin despintarse.'},
        {autor:'Diego M.',    estrellas:4, texto:'Buen tejido, pero la talla M me quedó justa. Pidan una más grande.'} ],
  2:  [ {autor:'Valentina P.',estrellas:5, texto:'El patrón de lluvia es un detalle precioso. Me los piden prestados todo el tiempo.'} ],
  3:  [ {autor:'Tomás G.',    estrellas:4, texto:'Cómodos para andar todo el día. El verde se ve mejor en persona.'} ],
  4:  [ {autor:'Javiera S.',  estrellas:5, texto:'Regalo perfecto para mi hermano, que ve puras películas de terror.'},
        {autor:'Rodrigo A.',  estrellas:3, texto:'El diseño es buenísimo pero el puño me quedó un poco suelto.'} ],
  5:  [ {autor:'Fernanda L.', estrellas:4, texto:'Llegaron en tres días a Punta Arenas. El rojo es intenso.'} ],
  6:  [ {autor:'Matías V.',   estrellas:5, texto:'Mi par favorito. El verde oscuro combina con todo.'} ],
  7:  [ {autor:'Antonia C.',  estrellas:5, texto:'Elegantes de verdad. Los uso con traje y nadie sospecha el chiste.'} ],
  8:  [ {autor:'Benjamín H.', estrellas:4, texto:'El dorado no se desgastó después de varios lavados.'} ],
  9:  [ {autor:'Paula N.',    estrellas:5, texto:'Las rayas verdes se ven mucho mejor que en la foto del catálogo.'} ],
  10: [ {autor:'Ignacio F.',  estrellas:5, texto:'Mi hija de ocho años me los robó. Tuve que comprar otro par.'},
        {autor:'Sofía T.',    estrellas:5, texto:'Suavísimos. Los mejores para andar en casa.'} ],
  11: [ {autor:'Cristóbal D.',estrellas:4, texto:'El café queda raro con jeans claros, pero el diseño vale la pena.'} ],
  12: [ {autor:'Martina Q.',  estrellas:5, texto:'Compré tres pares. El naranjo es exactamente el de la película.'} ]
};
