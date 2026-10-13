let estrenosActivos = false;


async function aplicarFiltrosCatalogo() {

    const juegos = await cargarJuegos();

    // Marcar los juegos que aparecen en ESTRENOS_IDS
    marcarEstrenos(juegos);

    const plataforma =
        document.getElementById("platformSelect")?.value || "Todos";

    const soloEstrenos =
        document.getElementById("filtro-estrenos")?.checked || false;

    sessionStorage.setItem("plataformaSeleccionada", plataforma);

    // Partir del catálogo completo, ordenado alfabéticamente
    let filtrados = [...juegos];

    // Filtrar por plataforma
    if (plataforma !== "Todos") {
        filtrados = filtrados.filter(juego =>
            juego.categoria === plataforma
        );
    }

    // Filtrar y ordenar los estrenos según ESTRENOS_IDS
    if (soloEstrenos) {

        const ordenEstrenos = new Map(
            ESTRENOS_IDS.map((id, indice) => [
                Number(id),
                indice
            ])
        );

        filtrados = filtrados
            .filter(juego =>
                ordenEstrenos.has(Number(juego.id))
            )
            .sort((a, b) =>
                ordenEstrenos.get(Number(a.id)) -
                ordenEstrenos.get(Number(b.id))
            );

    }

    // Actualizar la lista que utiliza el buscador
    establecerJuegosActuales(filtrados);

    // Limpiar la búsqueda anterior
    const buscador = document.getElementById("search-input");

    if (buscador) {
        buscador.value = "";
    }

    sessionStorage.removeItem("textoBusqueda");

    // Reiniciar el catálogo y su scroll infinito
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