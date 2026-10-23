
let estrenosActivos = false;

// Etiquetas legibles para los géneros del catálogo.
const NOMBRES_GENEROS = {
    ACT: "Acción",
    ADV: "Aventura",
    ARC: "Arcade",
    RPG: "RPG",
    BOARD: "Juego de mesa",
    BTU: "Beat 'em up",
    CAS: "Casual",
    CITY: "Construcción de ciudades",
    FAM: "Familiar",
    FGT: "Pelea",
    FPS: "Disparos en 1ra persona",
    HNS: "Hack and slash",
    HOR: "Terror",
    IND: "Indie",
    JRPG: "RPG japonés",
    MV: "Metroidvania",
    MUSOU: "Musou",
    OW: "Mundo abierto",
    PLAT: "Plataformas",
    PUZ: "Puzles",
    RACE: "Carreras",
    CARDS: "Cartas",
    ROGL: "Roguelike",
    RHY: "Ritmo",
    RTS: "Estrategia en tiempo real",
    STR: "Estrategia",
    RUN: "Runner",
    SB: "Sandbox",
    SURVH: "Survival horror",
    SHMUP: "Shoot 'em up",
    SIM: "Simulación",
    SPORT: "Deportes",
    STL: "Sigilo",
    SURV: "Supervivencia",
    TD: "Defensa de torres",
    TPS: "Disparos en 3ra persona",
    SL: "Soulslike",
    VN: "Novela visual",
    DL: "Tipo Diablo",
    TAC: "Táctico",
    CF: "Ciencia-Ficción",
    NADV: "Aventura narrativa",
    COOP: "Coperativo",
	MOBA: "MOBA"
};


 // Llena el selector usando los géneros existentes en games.json.
function llenarSelectorGeneros(juegos) {
    const select = document.getElementById("genreSelect");

    if (!select) return;

    const generoGuardado =
        sessionStorage.getItem("generoSeleccionado") || "Todos";

    const generos = [
        ...new Set(
            juegos.flatMap(juego =>
                String(juego.genero || "")
                    .split("/")
                    .map(g => g.trim().toUpperCase())
                    .filter(Boolean)
            )
        )
    ].sort((a, b) =>
        (NOMBRES_GENEROS[a] || a).localeCompare(
            NOMBRES_GENEROS[b] || b,
            "es",
            { sensitivity: "base" }
        )
    );

    select.replaceChildren(
        new Option("TODOS", "Todos")
    );

    generos.forEach(genero => {
        const nombre = NOMBRES_GENEROS[genero];

        const etiqueta = nombre
            ? `${nombre}`
            : genero;

        select.add(new Option(etiqueta, genero));
    });

    select.value = generos.includes(generoGuardado)
        ? generoGuardado
        : "Todos";
}


// Aplica conjuntamente plataforma, género y estrenos.
async function aplicarFiltrosCatalogo() {
    const juegos = await cargarJuegos();

    marcarEstrenos(juegos);

    const plataforma =
        document.getElementById("platformSelect")?.value || "Todos";

    const genero =
        document.getElementById("genreSelect")?.value || "Todos";

    const soloEstrenos =
        document.getElementById("filtro-estrenos")?.checked || false;

    estrenosActivos = soloEstrenos;

    sessionStorage.setItem("plataformaSeleccionada", plataforma);
    sessionStorage.setItem("generoSeleccionado", genero);

    let filtrados = juegos.filter(juego => {
        // Plataforma
        if (
            plataforma !== "Todos" &&
            juego.categoria !== plataforma
        ) {
            return false;
        }

        // Género: admite juegos con uno, dos o tres géneros.
        if (genero !== "Todos") {
            const generosJuego = String(juego.genero || "")
                .split("/")
                .map(g => g.trim().toUpperCase());

            if (!generosJuego.includes(genero)) {
                return false;
            }
        }

        // Estrenos
        if (
            soloEstrenos &&
            !ESTRENOS_IDS.includes(Number(juego.id))
        ) {
            return false;
        }

        return true;
    });

    // Orden de estrenos o alfabético.
    if (soloEstrenos) {
        const ordenEstrenos = new Map(
            ESTRENOS_IDS.map((id, indice) => [Number(id), indice])
        );

        filtrados.sort((a, b) =>
            (ordenEstrenos.get(Number(a.id)) ?? Infinity) -
            (ordenEstrenos.get(Number(b.id)) ?? Infinity)
        );
    } else {
        filtrados.sort((a, b) =>
            a.titulo.localeCompare(b.titulo, "es")
        );
    }

    // Esta será la lista base sobre la que trabaja el buscador.
    establecerJuegosActuales(filtrados);

    // Mantener la búsqueda al modificar cualquier filtro.
    const buscador = document.getElementById("search-input");

const texto = (
    buscador?.value ||
    sessionStorage.getItem("textoBusqueda") ||
    ""
).trim();

if (buscador && texto) {
    buscador.value = texto;
}

    if (texto) {
        await buscarJuegos({ target: buscador });
    } else {
        await mostrarCatalogo(filtrados);
    }
}

async function iniciarFiltros() {
    const juegos = await cargarJuegos();

    const selectPlataforma =
        document.getElementById("platformSelect");

    const selectGenero =
        document.getElementById("genreSelect");

    const checkbox =
        document.getElementById("filtro-estrenos");

    // Crear las opciones reales de género.
    llenarSelectorGeneros(juegos);

    // Restaurar la plataforma seleccionada.
    if (selectPlataforma) {
        const guardada =
            sessionStorage.getItem("plataformaSeleccionada");

        if (
            guardada !== null &&
            Array.from(selectPlataforma.options).some(
                opcion => opcion.value === guardada
            )
        ) {
            selectPlataforma.value = guardada;
        }

        selectPlataforma.addEventListener(
            "change",
            aplicarFiltrosCatalogo
        );
    }

    // Restaurar y escuchar el género.
    if (selectGenero) {
        selectGenero.addEventListener(
            "change",
            aplicarFiltrosCatalogo
        );
    }

    // Escuchar el filtro de estrenos.
    if (checkbox) {
        checkbox.addEventListener(
            "change",
            aplicarFiltrosCatalogo
        );
    }
}
