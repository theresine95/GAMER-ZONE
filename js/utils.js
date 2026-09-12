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

    854,
    850,
    852,
    544,
    743,
    1,
    389,
    569,
    159,
    616,
    525,
    223,
    860,
    849,
    840,
    738,
    619,
    855,
    845,
    493,

];

function marcarEstrenos(juegos){

    juegos.forEach(juego=>{

        juego.nuevo = ESTRENOS_IDS.includes(juego.id);

    });

}