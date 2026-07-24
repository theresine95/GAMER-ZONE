async function cargarEstrenos(){

    const juegos = await cargarJuegos();

    marcarEstrenos(juegos);

    const juegosEstrenos = juegos

        .filter(juego => juego.nuevo)

        .sort((a,b)=>

            a.titulo.localeCompare(b.titulo,"es")

        );

    mostrarCatalogo(juegosEstrenos);

}

document.addEventListener("DOMContentLoaded", async ()=>{

    iniciarEventosCatalogo();

    iniciarCarrito();

    await cargarEstrenos();

});