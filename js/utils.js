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

931,
925,
927,
911,
924,
900,
935,
860,
928,
910,
850,
852,
743,
905,
1,
389,
569,
159,
616,
471,
525,
223,
98,
677,
901,
489,
561,
207,
82,
423,
6,
109

];

function marcarEstrenos(juegos){

    juegos.forEach(juego=>{

        juego.nuevo = ESTRENOS_IDS.includes(juego.id);

    });

}