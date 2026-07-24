// ==========================
// CARGAR CATÁLOGO
// ==========================

async function cargarCatalogo(){

    const juegos = await cargarJuegos();

    marcarEstrenos(juegos);

    mostrarCatalogo(juegos);

}

// ==========================
// MOSTRAR CATÁLOGO
// ==========================

function mostrarCatalogo(juegos, esEstrenos = false){

    reiniciarScroll(juegos, esEstrenos);

    requestAnimationFrame(() => {

        if(typeof actualizarBotones === "function"){

            actualizarBotones();

        }

    });

}

// ==========================
// CREAR TARJETA
// ==========================

function crearTarjeta(juego){

    return `

    <div class="box" data-id="${juego.id}">

        <figure>

            ${juego.nuevo ? `
                <span class="badge-new">
                    NEW!!!
                </span>
            ` : ""}

            <img
                class="game-cover"
                src="images/${juego.titulo}.webp"
                alt="${juego.titulo}"
                loading="lazy"
                data-id="${juego.id}">

        </figure>

        <div class="product-txt">

            <h2>
                ${juego.titulo}
            </h2>

            <p class="game-meta">

                <span class="tamaño">
                    📦${juego.tamano}
                </span>

                <span class="precio">
                    💰${juego.precio}
                </span>

            </p>

            <div class="card-buttons">

                <a href="#" class="btn-2 trailer">
                    TRAILER
                </a>

                <a href="#" class="agregar-carrito btn-3" data-id="${juego.id}">
                    LISTAR
                </a>

            </div>

        </div>

    </div>

    `;

}

// ==========================
// EVENTOS DEL CATÁLOGO
// ==========================

function iniciarEventosCatalogo() {

    const lista = document.getElementById("lista-juegos");

    if (!lista) return;

    lista.addEventListener("click", abrirDetalles);

    lista.addEventListener("click", abrirTrailer);

}

// ==========================
// ABRIR DETALLES
// ==========================

function abrirDetalles(e) {

    const imagen = e.target.closest(".game-cover");

    if (!imagen) return;

    location.href = `detalles.html?id=${imagen.dataset.id}`;

}