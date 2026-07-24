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

function reiniciarScroll(juegos, esEstrenos = false){

    estadoScroll.juegos = juegos;

    estadoScroll.esEstrenos = esEstrenos;

    estadoScroll.pagina = 0;

    estadoScroll.cargando = false;

    const lista = document.getElementById("lista-juegos");

    if(!lista) return;

    lista.innerHTML = "";

    if(estadoScroll.observer){

        estadoScroll.observer.disconnect();

        estadoScroll.observer = null;

    }

    cargarMasJuegos();
    
    const trigger = document.getElementById("scroll-trigger");
    
    if(trigger){
        
        iniciarScrollInfinito();
    
    }

}

// ==========================
// CARGAR MÁS JUEGOS
// ==========================

function cargarMasJuegos(){

    if(estadoScroll.cargando) return;

    const lista = document.getElementById("lista-juegos");

    const loading = document.getElementById("loading-more");
    
    if(!lista) return;

    const inicio = estadoScroll.pagina * estadoScroll.porPagina;

    if(inicio >= estadoScroll.juegos.length){

        loading.textContent = "No hay más juegos para mostrar.";

        if(estadoScroll.observer){

            estadoScroll.observer.disconnect();

        }

        return;

    }

    estadoScroll.cargando = true;

    if(loading){
        
        loading.style.display = "flex";
    }

    if(loading){
        
        loading.textContent = "Cargando más juegos...";
    }

    requestAnimationFrame(()=>{

        const fin = inicio + estadoScroll.porPagina;

        const lote = estadoScroll.juegos.slice(inicio, fin);

        lote.forEach(juego=>{

            lista.insertAdjacentHTML(
                
                "beforeend",
                
                crearTarjeta(
                    
                    juego,
                    
                    estadoScroll.esEstrenos
                
                )
            
            );

        });

        estadoScroll.pagina++;

        estadoScroll.cargando = false;

        actualizarBotones();

        if(estadoScroll.pagina * estadoScroll.porPagina >= estadoScroll.juegos.length){

            loading.textContent = "No hay más juegos para mostrar.";

        }else{

            loading.textContent = "Desplázate para cargar más juegos...";

        }

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