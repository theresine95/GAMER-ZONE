function normalizar(texto) {

    return texto
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

}

/* ==========================================
   JUEGOS MARCADOS COMO ESTRENO
========================================== */

const ESTRENOS_IDS = [

    753,
    146,
    
    851,
    845,
    840,
    738,
    849,

    98,
    223,
    525,
    471,
    616,
    159,
    569,
    389,
    1,
    852,
    743,
    544,

    850

];

function marcarEstrenos(juegos){

    juegos.forEach(juego=>{

        juego.nuevo = ESTRENOS_IDS.includes(juego.id);

    });

}