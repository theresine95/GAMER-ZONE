// ==========================
// ABRIR TRAILER
// ==========================

function abrirTrailerPorTitulo(titulo){

    const busqueda = encodeURIComponent(`${titulo} trailer`);

    window.open(
        `https://www.youtube.com/results?search_query=${busqueda}`,
        "_blank"
    );

}

// ==========================
// EVENTO DEL CATÁLOGO
// ==========================

async function abrirTrailer(e){

    const boton = e.target.closest(".trailer");

    if(!boton) return;

    e.preventDefault();

    const box = boton.closest(".box");

    const id = Number(box.dataset.id);

    const juegos = await cargarJuegos();

    const juego = juegos.find(j => j.id === id);

    if(!juego) return;

    abrirTrailerPorTitulo(juego.titulo);

}