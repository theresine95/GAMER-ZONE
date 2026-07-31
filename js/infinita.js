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

async function reiniciarScroll(juegos, esEstrenos = false){

    estadoScroll.juegos = juegos;

    estadoScroll.esEstrenos = esEstrenos;

    estadoScroll.cargando = false;

    const lista = document.getElementById("lista-juegos");

    if(!lista) return;

    lista.innerHTML = "";

    if(estadoScroll.observer){

        estadoScroll.observer.disconnect();

        estadoScroll.observer = null;

    }

    const ultimoIndice = Number(sessionStorage.getItem("ultimoIndice"));

    if(!isNaN(ultimoIndice) && ultimoIndice >= 0){

        const paginaNecesaria = Math.floor(ultimoIndice / estadoScroll.porPagina);

        estadoScroll.pagina = 0;

        while(estadoScroll.pagina <= paginaNecesaria){
            
            await cargarMasJuegos();
        
        }

    }else{

        estadoScroll.pagina = 0;

        cargarMasJuegos();

    }

    const trigger = document.getElementById("scroll-trigger");

    if(trigger){

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