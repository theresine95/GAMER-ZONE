// ==========================
// DATOS GLOBALES
// ==========================

// Todos los juegos del JSON
let juegos = [];

// Juegos que se están mostrando actualmente
// (Todos, Hypervisor, Estrenos, etc.)
let juegosActuales = [];

// ==========================
// CARGAR JUEGOS
// ==========================

async function cargarJuegos() {

    if (juegos.length) return juegos;

    const res = await fetch("games.json");

    juegos = await res.json();

    juegos.sort((a, b) =>
        a.titulo.localeCompare(b.titulo, "es")
    );

    // Al iniciar, el catálogo visible es el completo
    juegosActuales = [...juegos];

    return juegos;

}

// ==========================
// OBTENER CATÁLOGO ACTUAL
// ==========================

function obtenerJuegosActuales() {

    return juegosActuales;

}

// ==========================
// CAMBIAR CATÁLOGO ACTUAL
// ==========================

function establecerJuegosActuales(lista) {

    juegosActuales = [...lista];

}

// ==========================
// RESTABLECER CATÁLOGO
// ==========================

function restablecerCatalogo() {

    juegosActuales = [...juegos];

}