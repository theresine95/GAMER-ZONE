// ==========================
// RESTAURAR SCROLL
// ==========================

function restaurarScroll(){

    const scrollPos = localStorage.getItem("scrollPos");

    if(scrollPos){

        window.scrollTo({
            top: parseInt(scrollPos),
            behavior: "auto"
        });

        localStorage.removeItem("scrollPos");

    }

}

// ==========================
// BOTÓN ARRIBA
// ==========================

const btnTop = document.getElementById("btnTop");

if(btnTop){

    window.addEventListener("scroll", () => {

        btnTop.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    btnTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}