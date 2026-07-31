// ==========================
// BUSCADOR
// ==========================

let scrollAntesBusqueda = 0;

// ==========================
// INICIAR
// ==========================

function iniciarBuscador() {

    const input = document.getElementById("search-input");

    if (!input) return;

    input.addEventListener("input", buscarJuegos);

    input.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            input.value = "";

            buscarJuegos({ target: input });

        }

    });

}

// ==========================
// BUSCAR
// ==========================

async function buscarJuegos(e) {

    const textoOriginal = e.target.value;

    const texto = normalizar(textoOriginal);

    // Guardar búsqueda
    if (textoOriginal.trim()) {

        sessionStorage.setItem("textoBusqueda", textoOriginal);

    } else {

        sessionStorage.removeItem("textoBusqueda");

    }

    // Buscar únicamente dentro del catálogo actual
    const juegos = obtenerJuegosActuales();

    // Guardar la posición cuando empieza la búsqueda
    if (texto.length === 1) {

        scrollAntesBusqueda = window.scrollY;

    }

    // ==========================
    // MOSTRAR TODO
    // ==========================

    if (!texto) {

        await mostrarCatalogo(juegos);

        window.scrollTo({

            top: scrollAntesBusqueda,

            behavior: "smooth"

        });

        return;

    }

    // ==========================
    // FILTRAR
    // ==========================

    const resultados = juegos.filter(juego =>

        normalizar(juego.titulo).includes(texto) ||

        normalizar(String(juego.anio)).includes(texto)

    );

    // ==========================
    // MOSTRAR RESULTADOS
    // ==========================

    if (resultados.length) {

        await mostrarCatalogo(resultados);

        requestAnimationFrame(() => {

            const primerResultado = document.querySelector(".box");

            if (!primerResultado) return;

            const margen = window.innerWidth <= 768 ? 100 : 78;

            const posicion =
                primerResultado.getBoundingClientRect().top +
                window.scrollY -
                margen;

            window.scrollTo({

                top: posicion,

                behavior: "smooth"

            });

        });

    } else {

        document.getElementById("lista-juegos").innerHTML = `

            <div class="sin-resultados">

                <h2>No se encontraron resultados...</h2>

                <p>Prueba con otro nombre.</p>

            </div>

        `;

    }

}

// ==========================
// RESTAURAR BÚSQUEDA
// ==========================

async function restaurarBusqueda() {

    const input = document.getElementById("search-input");

    if (!input) return;

    const texto = sessionStorage.getItem("textoBusqueda");

    if (!texto) return;

    input.value = texto;

    await buscarJuegos({

        target: input

    });

}