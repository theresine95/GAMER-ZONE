document.addEventListener("DOMContentLoaded", async () => {

    iniciarEventosCatalogo();

    iniciarCarrito();

    iniciarBuscador();

    await iniciarFiltros();

    // Cargar el catálogo respetando los filtros guardados
    await aplicarFiltrosCatalogo();

    await restaurarJuego();

});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }

});