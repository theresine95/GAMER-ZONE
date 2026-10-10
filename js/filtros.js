let estrenosActivos = false;

// Aplica los filtros de plataforma y estrenos
async function aplicarFiltrosCatalogo() {

    const juegos = await cargarJuegos();

    // Marca los estrenos usando los IDs de utils.js
    marcarEstrenos(juegos);

    const plataforma =
        document.getElementById("platformSelect")?.value || "Todos";

    const soloEstrenos =
        document.getElementById("filtro-estrenos")?.checked || false;

    // Guardar la plataforma seleccionada
    sessionStorage.setItem("plataformaSeleccionada", plataforma);

    let filtrados = juegos;

    // Filtrar por plataforma
    if (plataforma !== "Todos") {
        filtrados = filtrados.filter(juego =>
            juego.categoria === plataforma
        );
    }

    // Filtrar por los IDs de estrenos
    if (soloEstrenos) {
        filtrados = filtrados.filter(juego =>
            ESTRENOS_IDS.includes(Number(juego.id))
        );
    }

    // Guardar la lista base para el buscador
    establecerJuegosActuales(filtrados);

    // Reiniciar el buscador al cambiar los filtros
    const buscador = document.getElementById("search-input");

    if (buscador) {
        buscador.value = "";
    }

    sessionStorage.removeItem("textoBusqueda");

    // Mostrar el resultado con el scroll infinito existente
    await mostrarCatalogo(filtrados);
}

async function iniciarFiltros() {

    const select = document.getElementById("platformSelect");
    const checkbox = document.getElementById("filtro-estrenos");

    // Restaurar la plataforma seleccionada anteriormente
    if (select) {
        const plataformaGuardada =
            sessionStorage.getItem("plataformaSeleccionada");

        if (
            plataformaGuardada !== null &&
            Array.from(select.options).some(
                opcion => opcion.value === plataformaGuardada
            )
        ) {
            select.value = plataformaGuardada;
        }

        // Aplicar los filtros cuando cambie la plataforma
        select.addEventListener("change", aplicarFiltrosCatalogo);
    }

    // Aplicar los filtros cuando cambie el estado de ESTRENOS
    if (checkbox) {
        checkbox.addEventListener("change", aplicarFiltrosCatalogo);
    }

}