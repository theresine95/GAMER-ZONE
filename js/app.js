document.addEventListener("DOMContentLoaded", async () => {

    iniciarEventosCatalogo();

    iniciarCarrito();

    iniciarBuscador();

    iniciarFiltros();

    await cargarCatalogo();

    await restaurarJuego();

});

window.addEventListener("load", ()=>{

    const loader=document.getElementById("loader");

    loader.classList.add("hide");

});