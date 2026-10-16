// ==========================
// ESTADO DEL SCROLL
// ==========================

const estadoScroll = {

    juegos: [],

    pagina: 0,

    porPagina: 32,

    observer: null,

    cargando: false,

    esEstrenos: false

};

// ==========================
// REINICIAR SCROLL
// ==========================


async function reiniciarScroll(juegos, esEstrenos = false) {

    estadoScroll.juegos = juegos;
    estadoScroll.esEstrenos = esEstrenos;
    estadoScroll.cargando = false;
    estadoScroll.pagina = 0;

    const lista = document.getElementById("lista-juegos");
    const loading = document.getElementById("loading-more");

    if (!lista) return;

    // Limpiar el catálogo anterior.
    lista.innerHTML = "";

    // Desconectar el observador anterior.
    if (estadoScroll.observer) {
        estadoScroll.observer.disconnect();
        estadoScroll.observer = null;
    }

    // CASO 1: ningún juego cumple los filtros.
    // No intentar restaurar posiciones ni cargar páginas.
    if (!Array.isArray(juegos) || juegos.length === 0) {

        lista.innerHTML = `
            <div class="sin-resultados">
                <h2>No se encontraron resultados...</h2>
                <p>
                    Prueba con otra plataforma, género
                    o combinación de filtros.
                </p>
            </div>
        `;

        if (loading) {
            loading.style.display = "none";
            loading.textContent = "";
        }

        // Evitar que una posición anterior provoque
        // otro intento de restauración.
        sessionStorage.removeItem("ultimoIndice");
        sessionStorage.removeItem("ultimoJuego");

        return;
    }

    if (loading) {
        loading.style.display = "flex";
        loading.textContent = "Cargando más juegos...";
    }

    // CASO 2: comprobar si el índice guardado sigue siendo válido.
    const indiceGuardado = sessionStorage.getItem("ultimoIndice");
    const ultimoIndice = Number(indiceGuardado);

    const indiceValido =
        indiceGuardado !== null &&
        Number.isInteger(ultimoIndice) &&
        ultimoIndice >= 0 &&
        ultimoIndice < juegos.length;

    if (indiceValido) {

        const paginaNecesaria = Math.floor(
            ultimoIndice / estadoScroll.porPagina
        );

        // El límite adicional impide cualquier bucle infinito.
        while (
            estadoScroll.pagina <= paginaNecesaria &&
            estadoScroll.pagina * estadoScroll.porPagina < juegos.length
        ) {
            const paginaAnterior = estadoScroll.pagina;

            await cargarMasJuegos();

            // Protección adicional: salir si no se pudo avanzar.
            if (
                estadoScroll.pagina <= paginaAnterior &&
                estadoScroll.cargando === false
            ) {
                break;
            }
        }

    } else {

        // La posición guardada ya no corresponde a esta lista.
        sessionStorage.removeItem("ultimoIndice");
        sessionStorage.removeItem("ultimoJuego");

        await cargarMasJuegos();
    }

    // Crear un observador nuevo únicamente si hay resultados.
    const trigger = document.getElementById("scroll-trigger");

    if (trigger && estadoScroll.pagina * estadoScroll.porPagina < juegos.length) {
        iniciarScrollInfinito();
    }
}


// ==========================
// CARGAR MÁS JUEGOS
// ==========================

async function cargarMasJuegos(){

    if(estadoScroll.cargando) return;

    const lista = document.getElementById("lista-juegos");
    const loading = document.getElementById("loading-more");

    if(!lista) return;

    const inicio = estadoScroll.pagina * estadoScroll.porPagina;

    if(inicio >= estadoScroll.juegos.length){

        if(loading){
            loading.textContent = "No hay más juegos para mostrar.";
        }

        if(estadoScroll.observer){
            estadoScroll.observer.disconnect();
        }

        return;
    }

    estadoScroll.cargando = true;

    if(loading){
        loading.style.display = "flex";
        loading.textContent = "Cargando más juegos...";
    }

    await new Promise(resolve=>{

        requestAnimationFrame(()=>{

            const fin = inicio + estadoScroll.porPagina;

            const lote = estadoScroll.juegos.slice(inicio, fin);

            lote.forEach(juego=>{

                lista.insertAdjacentHTML(
                    "beforeend",
                    crearTarjeta(juego, estadoScroll.esEstrenos)
                );

            });

            estadoScroll.pagina++;

            estadoScroll.cargando = false;

            actualizarBotones();

            if(loading){

                if(estadoScroll.pagina * estadoScroll.porPagina >= estadoScroll.juegos.length){

                    loading.textContent = "No hay más juegos para mostrar.";

                }else{

                    loading.textContent = "Desplázate para cargar más juegos...";

                }

            }

            resolve();

        });

    });

}

// ==========================
// SCROLL INFINITO
// ==========================

function iniciarScrollInfinito(){

    const trigger = document.getElementById("scroll-trigger");

    if(!trigger) return;

    estadoScroll.observer = new IntersectionObserver(entries=>{

        if(entries[0].isIntersecting){

            cargarMasJuegos();

        }

    },{

        root:null,

        rootMargin:"250px",

        threshold:0

    });

    estadoScroll.observer.observe(trigger);

}


// ==========================
// RESTAURAR JUEGO
// ==========================

async function restaurarJuego(){

    const id = sessionStorage.getItem("ultimoJuego");

    if(!id) return;

    await new Promise(resolve=>requestAnimationFrame(resolve));

    const tarjeta = document.querySelector(`[data-id="${id}"]`);

    if(tarjeta){

        tarjeta.scrollIntoView({

            behavior:"instant",

            block:"center"

        });

    }

    sessionStorage.removeItem("ultimoJuego");

    sessionStorage.removeItem("ultimoIndice");

}