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

    657,
    658,
    846,
    310,
    642,
    659,
    848,
    331,

    841,
    843,
    844,
    847,
    146,
    718,

    849,
    845,
    738,
    840,
    1,
    743
    

];

function marcarEstrenos(juegos){

    juegos.forEach(juego=>{

        juego.nuevo = ESTRENOS_IDS.includes(juego.id);

    });

}