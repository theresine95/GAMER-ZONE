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

    628,
    755,
    738,
    146,
    840,
    1,
    743,
    841

];

function marcarEstrenos(juegos){

    juegos.forEach(juego=>{

        juego.nuevo = ESTRENOS_IDS.includes(juego.id);

    });

}