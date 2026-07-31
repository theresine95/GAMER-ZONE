// ==========================
// RESTAURAR JUEGO
// ==========================

async function restaurarJuego(){

    const id = Number(sessionStorage.getItem("ultimoJuego"));

    if(!id) return;

    // Esperar a que el DOM termine de renderizar
    await new Promise(resolve => requestAnimationFrame(resolve));

    const tarjeta = document.querySelector(`[data-id="${id}"]`);

    if(tarjeta){

        tarjeta.scrollIntoView({

            behavior: "instant",

            block: "center"

        });

    }

    sessionStorage.removeItem("ultimoJuego");

    sessionStorage.removeItem("ultimoIndice");

}


// ==========================
// BOTÓN ARRIBA
// ==========================

const btnTop = document.getElementById("btnTop");

if(btnTop){

    window.addEventListener("scroll", ()=>{

        btnTop.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    btnTop.addEventListener("click", ()=>{

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}