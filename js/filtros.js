// ==========================
// FILTROS
// ==========================

async function iniciarFiltros() {

    const select = document.getElementById("platformSelect");

    if (!select) return;

    select.addEventListener("change", async () => {

        const juegos = await cargarJuegos();

        let filtrados;

        if (select.value === "Todos") {

            filtrados = juegos;

        } else {

            filtrados = juegos.filter(juego =>
                juego.categoria === select.value
            );

        }

        // Guardar el catálogo actual para el buscador
        establecerJuegosActuales(filtrados);

        // Limpiar el buscador al cambiar de plataforma
        const input = document.getElementById("search-input");

        if (input) {

            input.value = "";

        }

        mostrarCatalogo(filtrados);

    });

}