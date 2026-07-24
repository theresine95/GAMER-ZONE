function iniciarMenu() {

    // Evita volver a inicializar el menú si ya fue inicializado
    if (document.body.dataset.menuInicializado === "true") return;
    document.body.dataset.menuInicializado = "true";

    // =====================================
    // INFORMACIÓN
    // =====================================

    const infoMenu = document.querySelector(".info-menu");
    const infoTrigger = document.querySelector(".info-trigger");
    const infoDropdown = document.querySelector(".info-dropdown");

    if (infoMenu && infoTrigger && infoDropdown) {

        // =========================
        // MÓVIL
        // =========================

        if (window.innerWidth <= 767) {

            infoTrigger.addEventListener("click", (e) => {

                e.preventDefault();
                e.stopPropagation();

                infoDropdown.classList.toggle("activo");
                infoMenu.classList.toggle("activo");

            });

            document.querySelectorAll(".submenu-item > p").forEach(titulo => {

                titulo.addEventListener("click", (e) => {

                    e.stopPropagation();

                    const item = titulo.parentElement;

                    document.querySelectorAll(".submenu-item").forEach(i => {

                        if (i !== item) {

                            i.classList.remove("activo");

                        }

                    });

                    item.classList.toggle("activo");

                });

            });

            document.addEventListener("click", (e) => {

                if (!infoMenu.contains(e.target)) {

                    infoDropdown.classList.remove("activo");
                    infoMenu.classList.remove("activo");

                    document.querySelectorAll(".submenu-item").forEach(item => {

                        item.classList.remove("activo");

                    });

                }

            });

        }

        // =========================
        // ESCRITORIO
        // =========================

        else {

            infoMenu.addEventListener("mouseenter", () => {

                infoDropdown.classList.add("activo");
                infoMenu.classList.add("activo");

            });

            infoMenu.addEventListener("mouseleave", () => {

                infoDropdown.classList.remove("activo");
                infoMenu.classList.remove("activo");

                document.querySelectorAll(".submenu-item").forEach(item => {

                    item.classList.remove("activo");

                });

            });

            document.querySelectorAll(".submenu-item").forEach(item => {

                item.addEventListener("mouseenter", () => {

                    item.classList.add("activo");

                });

                item.addEventListener("mouseleave", () => {

                    item.classList.remove("activo");

                });

            });

        }

    }

    // =====================================
    // CARRITO
    // =====================================

    const carrito = document.querySelector(".submenu");
    const carritoIcono = document.getElementById("img-carrito");
    const carritoTabla = document.getElementById("carrito");

    if (carrito && carritoIcono && carritoTabla) {

        // =========================
        // MÓVIL
        // =========================

        if (window.innerWidth <= 767) {

            carritoIcono.addEventListener("click", (e) => {

                e.preventDefault();
                e.stopPropagation();

                carrito.classList.toggle("activo");

            });

            document.addEventListener("click", (e) => {

                if (!carrito.contains(e.target)) {

                    carrito.classList.remove("activo");

                }

            });

        }

        // =========================
        // ESCRITORIO
        // =========================

        else {

            carrito.addEventListener("mouseenter", () => {

                carrito.classList.add("activo");

            });

            carrito.addEventListener("mouseleave", () => {

                carrito.classList.remove("activo");

            });

        }

    }

}

// Inicializar automáticamente en las páginas normales
document.addEventListener("DOMContentLoaded", iniciarMenu);