// ==========================
// FILTROS
// ==========================

async function iniciarFiltros() {

    const select = document.getElementById("platformSelect");

    if (!select) return;

    select.addEventListener("change", async () => {

        const juegos = await cargarJuegos();

        if (select.value === "Todos") {

            reiniciarScroll(juegos);

        } else {

            const filtrados = juegos.filter(juego =>
                juego.categoria === select.value
            );

            reiniciarScroll(filtrados);

        }

    });

}