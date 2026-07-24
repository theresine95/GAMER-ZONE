// ==========================
// DETALLES DEL JUEGO
// ==========================

document.addEventListener("DOMContentLoaded", async () => {

    await cargarDetalles();

    iniciarCarrito();

});

// ==========================
// CARGAR DETALLES
// ==========================

async function cargarDetalles() {

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    const juegos = await cargarJuegos();

    marcarEstrenos(juegos);

    const juego = juegos.find(j => j.id === id);

    const contenedor = document.getElementById("gameDetails");

    if (!contenedor) return;

    if (!juego) {

        contenedor.innerHTML = `

            <h2>

                Juego no encontrado

            </h2>

        `;

        return;

    }

    contenedor.innerHTML = `

        ${crearCabecera(juego)}

        ${crearDescripcion(juego)}

        ${crearRequisitos(juego)}

        ${crearGaleria(juego)}

    `;

    document.body.dataset.menuInicializado = "false";

    iniciarMenu();
    iniciarCarrito();
    iniciarTrailerDetalle();

}

// ==========================
// CABECERA
// ==========================

function crearCabecera(juego){

    return `

        <div class="details-container">

            <div class="details-header">

                <div class="details-cover-wrapper">

                    ${juego.nuevo ? `
                        <span class="badge-new">
                            NEW!!!
                        </span>
                    ` : ""}

                    <img

                        src="images/${juego.titulo}.webp"

                        alt="${juego.titulo}"

                        class="details-cover"

                        onerror="this.src='images/placeholder.webp'">

                </div>

                <div class="details-info">

                    <h2 class="details-title">

                        ${juego.titulo}

                    </h2>

                    ${crearMeta(juego)}

                    ${crearBotones(juego)}

                </div>

            </div>

    `;

}

// ==========================
// INFORMACIÓN
// ==========================

function crearMeta(juego){

    return `

        <div class="details-meta">

            <div class="meta-item">

                <div class="meta-label">

                    Plataforma

                </div>

                <div class="meta-value">

                    ${juego.plataforma}

                </div>

            </div>

            <div class="meta-item">

                <div class="meta-label">

                    Año

                </div>

                <div class="meta-value">

                    ${juego.anio}

                </div>

            </div>

            <div class="meta-item">

                <div class="meta-label">

                    Género

                </div>

                <div class="meta-value">

                    ${juego.genero}

                </div>

            </div>

            <div class="meta-item">

                <div class="meta-label">

                    Update

                </div>

                <div class="meta-value">

                    ${juego.update}

                </div>

            </div>

            <div class="meta-item">

                <div class="meta-label">

                    Tamaño

                </div>

                <div class="meta-value">

                    📦 ${juego.tamano}

                </div>

            </div>

            <div class="meta-item">

                <div class="meta-label">

                    Precio

                </div>

                <div class="meta-value">

                    💰 ${juego.precio}

                </div>

            </div>

        </div>

    `;

}

// ==========================
// BOTONES
// ==========================

function crearBotones(juego){

    return `

        <div class="btn-group">

    <a
        href="#"
        class="btn-2 trailer-detalle"
        data-titulo="${juego.titulo}">

        TRAILER

    </a>

    <a
        href="#"
        class="agregar-carrito btn-3"
        data-id="${juego.id}">

        LISTAR

    </a>

    <li class="submenu">
                        <img id="img-carrito" class="img-cart" src="images/otras/carrito-de-compras.svg" alt="car">
                        <span id="contador-carrito">0</span>
                        <div id="carrito">
                            <!-- Encabezado fijo -->
                             <table class="carrito-head">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Juego</th>
                                        <th>Tamaño</th>
                                        <th>Precio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                            <!-- Solo esta parte hace scroll -->
                             <div class="carrito-lista">
                                <table id="lista-carrito">

                                    <tbody id="tabla-carrito">

                                    </tbody>
                                </table>
                            </div>
                            <table class="carrito-footer">
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href="#" id="vaciar-carrito" class="btn-4">
                                                Vaciar
                                            </a>
                                        </td>
                                        <td class="footer-total">
                                            TOTAL:
                                        </td>
                                        <td class="footer-tamano">
                                            📦 <span id="total-tamano">0 GB</span>
                                        </td>
                                        <td class="footer-precio">
                                            💰 <span id="total-precio">0 Cup</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>

</div>

    `;

}

// ==========================
// DESCRIPCIÓN
// ==========================

function crearDescripcion(juego){

    return `

        <div class="details-description">

            <h2>

                Descripción

            </h2>

            <p>

                ${juego.descripcion}

            </p>

        </div>

        <div class="details-description">

            <h2>

                Incluye

            </h2>

            <p>

                ${juego.incluye}

            </p>

        </div>

    `;

}

// ==========================
// REQUISITOS
// ==========================

function crearRequisitos(juego){

    const requisitos = [

        ["SO", juego.SO],

        ["Procesador", juego.Procesador],

        ["RAM", juego.RAM],

        ["Gráficos", juego.Gráficos],

        ["DirectX", juego.DirectX],

        ["Notas Adicionales", juego.notas]

    ];

    return `

        <div class="details-description">

            <h2>

                Requisitos del Sistema

            </h2>

            ${requisitos.map(([titulo, valor]) => `

                <div class="req-line">

                    <span class="req-title">

                        ${titulo}

                    </span>

                    <span class="req-value">

                        ${valor || "-"}

                    </span>

                </div>

            `).join("")}

        </div>

    `;

}

// ==========================
// GALERÍA
// ==========================

function crearGaleria(juego){

    return `

        <div class="details-description">

            <h2>

                Imágenes

            </h2>

            <div class="galeria">

                ${crearImagenes(juego)}

            </div>

        </div>

        </div>

    `;

}

// ==========================
// IMÁGENES
// ==========================

function crearImagenes(juego){

    if(!juego.imagenes || !juego.imagenes.length){

        return `

            <p>

                No hay imágenes disponibles.

            </p>

        `;

    }

    return juego.imagenes.map(img=>`

        <div class="caja">

            <img

                src="${img}"

                alt="${juego.titulo}"

                loading="lazy"

                onerror="this.style.display='none'">

        </div>

    `).join("");

}


// ==========================
// TRAILER DETALLE
// ==========================

function iniciarTrailerDetalle() {

    const boton = document.querySelector(".trailer-detalle");

    if (!boton) return;

    boton.addEventListener("click", abrirTrailerDetalle);

}

function abrirTrailerDetalle(e) {

    e.preventDefault();

    const titulo = e.currentTarget.dataset.titulo;

    if (!titulo) return;

    const busqueda = encodeURIComponent(`${titulo} trailer`);

    window.open(
        `https://www.youtube.com/results?search_query=${busqueda}`,
        "_blank"
    );

}