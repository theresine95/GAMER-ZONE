// ==========================
// VARIABLES
// ==========================

let carrito = [];

// Referencias al DOM
let contenedorCarrito;
let tablaCarrito;
let contadorCarrito;
let totalTamano;
let totalPrecio;
let btnVaciar;
let imgCarrito;

// Iconos del carrito
const ICONO_CARRITO = "images/otras/carrito-de-compras.svg";
const ICONO_CARRITO_ROJO = "images/otras/carrito-de-compras-rojo.svg";

// ==========================
// INICIAR
// ==========================

function iniciarCarrito() {

    // Obtener elementos del DOM
    contenedorCarrito = document.getElementById("carrito");

    tablaCarrito = document.getElementById("tabla-carrito");

    contadorCarrito =
        document.getElementById("contador-carrito") ||
        document.getElementById("contador-carrito-detalle");

    totalTamano = document.getElementById("total-tamano");

    totalPrecio = document.getElementById("total-precio");

    btnVaciar = document.getElementById("vaciar-carrito");

    imgCarrito =
        document.getElementById("img-carrito") ||
        document.getElementById("img-carrito-detalle");

    // Evitar registrar el mismo evento varias veces
    document.removeEventListener("click", comprarElemento);
    document.addEventListener("click", comprarElemento);

    if (contenedorCarrito) {

        contenedorCarrito.removeEventListener("click", eliminarElemento);
        contenedorCarrito.addEventListener("click", eliminarElemento);

    }

    if (btnVaciar) {

        btnVaciar.removeEventListener("click", vaciarCarrito);
        btnVaciar.addEventListener("click", vaciarCarrito);

    }

    cargarLocalStorage();

}

// ==========================
// AGREGAR AL CARRITO
// ==========================

async function comprarElemento(e) {

    const boton = e.target.closest(".agregar-carrito");

    if (!boton) return;

    e.preventDefault();

    const id = Number(boton.dataset.id);

    // Ya está agregado
    if (carrito.some(j => j.id === id)) return;

    const juegos = await cargarJuegos();

    const juego = juegos.find(j => j.id === id);

    if (!juego) return;

    agregarProducto(juego);

}

// ==========================
// AGREGAR PRODUCTO
// ==========================

function agregarProducto(juego) {

    const existe = carrito.some(item => item.id == juego.id);

    if (existe) return;

    carrito.push(juego);

    // Animación del carrito
    if (imgCarrito) {

        imgCarrito.classList.remove("shake");

        void imgCarrito.offsetWidth;

        imgCarrito.classList.add("shake");

    }

    imgCarrito.classList.remove("pop");
    
    void imgCarrito.offsetWidth;
    
    imgCarrito.classList.add("pop");

    renderizarCarrito();

}

// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarElemento(e) {

    const boton = e.target.closest(".borrar");

    if (!boton) return;

    e.preventDefault();

    const id = Number(boton.dataset.id);

    carrito = carrito.filter(juego => juego.id !== id);

    renderizarCarrito();

}

// ==========================
// RENDERIZAR CARRITO
// ==========================

function renderizarCarrito() {

    if (!tablaCarrito) return;

    tablaCarrito.innerHTML = "";

    carrito.forEach(juego => {
        tablaCarrito.appendChild(
            crearFila(juego)
        );
    });

    actualizarResumen();

    actualizarContador();

    actualizarBotones();

    guardarLocalStorage();

}

// ==========================
// CREAR FILA
// ==========================

function crearFila(juego) {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>

            <img
                src="images/${juego.titulo}.webp"
                width="56"
                height="70">

        </td>

        <td>

            ${juego.titulo}

        </td>

        <td>

            📦${juego.tamano}

        </td>

        <td>

            💰${juego.precio}

        </td>

        <td>

            <a
                href="#"
                class="borrar"
                data-id="${juego.id}">

                X

            </a>

        </td>

    `;

    return row;

}

// ==========================
// CONVERTIR TAMAÑO
// ==========================

function convertirAGB(tamano) {

    if (!tamano) return 0;

    const valor = parseFloat(tamano);
    const unidad = tamano.toUpperCase();

    if (unidad.includes("TB")) {
        return valor * 1024;
    }

    if (unidad.includes("GB")) {
        return valor;
    }

    if (unidad.includes("MB")) {
        return valor / 1024;
    }

    if (unidad.includes("KB")) {
        return valor / (1024 * 1024);
    }

    return 0;

}

function redondeoPersonalizado(numero) {

    const entero = Math.floor(numero);
    const decimal = numero - entero;

    if (decimal < 0.4) {
        return entero;          // 29.4 -> 29
    } else {
        return entero + 1;      // 29.5, 29.6 -> 30
    }

}


function formatearTamano(gb) {

    if (gb >= 1024) {
        return redondeoPersonalizado(gb / 1024) + " TB";
    }

    if (gb >= 1) {
        return redondeoPersonalizado(gb) + " GB";
    }

    return redondeoPersonalizado(gb * 1024) + " MB";

}

function actualizarResumen() {

    if (!totalTamano || !totalPrecio) return;

    let precio = 0;

    let tamano = 0;

    carrito.forEach(juego => {

        precio += parseFloat(juego.precio) || 0;

        tamano += convertirAGB(juego.tamano);

    });

    totalTamano.textContent = formatearTamano(tamano);

    totalPrecio.textContent = precio + " Cup";

    // Animación de los totales
    [totalTamano, totalPrecio].forEach(total => {

        total.classList.remove("total-pop");

        void total.offsetWidth;

        total.classList.add("total-pop");

    });

}


// ==========================
// VACIAR CARRITO
// ==========================

function vaciarCarrito(e) {

    if (e) e.preventDefault();

    carrito = [];

    renderizarCarrito();

}

// ==========================
// GUARDAR LOCALSTORAGE
// ==========================

function guardarLocalStorage() {

    const ids = carrito.map(juego => juego.id);

    localStorage.setItem(
        "carrito",
        JSON.stringify(ids)
    );

}

// ==========================
// CARGAR LOCALSTORAGE
// ==========================

async function cargarLocalStorage() {

    const ids = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    if (!ids.length) {

        carrito = [];

        renderizarCarrito();

        return;

    }

    const juegos = await cargarJuegos();

    carrito = ids
        .map(id => juegos.find(j => j.id == id))
        .filter(Boolean);

    renderizarCarrito();

}



// ==========================
// CONTADOR
// ==========================

function actualizarContador() {

    if (!contadorCarrito) return;

    const cantidad = carrito.length;

    // Actualizar contador
    contadorCarrito.textContent = cantidad;
    contadorCarrito.style.display = cantidad ? "flex" : "none";

    // Actualizar icono del carrito
    if (imgCarrito) {

        const tieneJuegos = cantidad > 0;

        imgCarrito.classList.toggle("carrito-activo", tieneJuegos);

        imgCarrito.src = tieneJuegos
            ? ICONO_CARRITO_ROJO
            : ICONO_CARRITO;

    }

    if (cantidad === 0) return;

    // Animación del contador
    contadorCarrito.classList.remove("contador-pop");

    void contadorCarrito.offsetWidth;

    contadorCarrito.classList.add("contador-pop");

}

// ==========================
// ACTUALIZAR BOTONES LISTAR
// ==========================

function actualizarBotones() {

    document.querySelectorAll(".agregar-carrito").forEach(boton => {

        const id = Number(boton.dataset.id);

        const agregado = carrito.some(juego => juego.id === id);

        if (agregado) {

            boton.textContent = "LISTO";

            boton.classList.add("agregado");

        } else {

            boton.textContent = "LISTAR";

            boton.classList.remove("agregado");

        }

    });

}

