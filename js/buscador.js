// ==========================
// BUSCADOR
// ==========================

let scrollAntesBusqueda = 0;

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

    const texto = normalizar(e.target.value);

    const juegos = await cargarJuegos();

    // Guardar la posición cuando empieza la búsqueda
    if (texto.length === 1) {
        scrollAntesBusqueda = window.scrollY;
    }

    // ==========================
    // MOSTRAR TODO
    // ==========================

    if (!texto) {

        mostrarCatalogo(juegos);

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

        normalizar(juego.anio).includes(texto)

    );

    // ==========================
    // MOSTRAR RESULTADOS
    // ==========================

    if (resultados.length) {

        mostrarCatalogo(resultados);

        const primerResultado = document.querySelector(".box");

        if (primerResultado) {

            const margen = window.innerWidth <= 768 ? 100 : 78;

            const posicion =
                primerResultado.getBoundingClientRect().top +
                window.scrollY -
                margen;

            window.scrollTo({

                top: posicion,

                behavior: "smooth"

            });

        }

    } else {

        document.getElementById("lista-juegos").innerHTML = `

            <div class="sin-resultados">

                <h2>No se encontraron resultados...</h2>

                <p>Prueba con otro nombre.</p>

            </div>

        `;

    }

}