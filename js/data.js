let juegos = [];

async function cargarJuegos() {

    if (juegos.length) return juegos;

    const res = await fetch("games.json");

    juegos = await res.json();

    juegos.sort((a, b) =>
        a.titulo.localeCompare(b.titulo, "es")
    );

    return juegos;

}