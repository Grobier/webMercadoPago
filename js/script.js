document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const btnPagar = document.getElementById('btn-pagar');
    const carritoIcono = document.getElementById('carrito-icono');
    const carritoContainer = document.getElementById('carrito-container');
    const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
    const overlay = document.getElementById('overlay');
    const contadorCarrito = document.getElementById('contador-carrito');
    const valorTotal = document.getElementById('valor-total');
    const codigoDescuentoInput = document.getElementById('codigo-descuento');
    const btnAplicarDescuento = document.getElementById('btn-aplicar-descuento');

    const precios = {
        Rehabilitacion: 34000,
        Entrenamiento: 18000,
        Recovery: 42000,
    };
    const codigoDescuentoValido = "DESCUENTO15";//CODIGO DE DESCUENTO
    let descuentoAplicado = false;

    botones.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const servicio = boton.dataset.servicio;
            const sesiones = obtenerSesiones(servicio);
            if (sesiones && sesiones > 0) {
                agregarServicioAlCarrito(servicio, sesiones);
                mostrarCarrito();
                actualizarContador();
            } else {
                alert('Por favor selecciona una cantidad válida de sesiones.');
            }
        });
    });

    function obtenerSesiones(servicio) {
        if (servicio === 'Rehabilitacion') {
            return document.getElementById('sesiones-Rehabilitacion').value;
        } else if (servicio === 'Entrenamiento') {
            return document.getElementById('sesiones-Entrenamiento').value;
        } else if (servicio === 'Recovery') {
            return document.getElementById('sesiones-Recovery').value;
        }
        return null;
    }

    function agregarServicioAlCarrito(servicio, sesiones) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push({ servicio, sesiones });
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = 0;
        listaCarrito.innerHTML = carrito
            .map((item, index) => {
                const precioUnitario = precios[item.servicio];
                const precioTotal = precioUnitario * item.sesiones;
                total += precioTotal;
                return `
                    <li>
                        ${item.servicio} - ${item.sesiones} sesiones a $${precioUnitario.toLocaleString('es-CL')} c/u:
                        <strong>$${precioTotal.toLocaleString('es-CL')}</strong>
                        <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                    </li>
                `;
            })
            .join('');

        if (descuentoAplicado) {
            total = aplicarDescuento(total);
        }

        valorTotal.textContent = `Total a pagar: $${total.toLocaleString('es-CL')}`;
        carritoContainer.style.display = 'block';
        overlay.style.display = 'block'; // Muestra el overlay
    }

    function actualizarContador() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    function aplicarDescuento(total) {
        return total * 0.85; // Aplica un descuento del 15%
    }

    btnAplicarDescuento.addEventListener('click', () => {
        const codigo = codigoDescuentoInput.value.trim();
        if (codigo === codigoDescuentoValido) {
            descuentoAplicado = true;
            alert('¡Descuento aplicado con éxito!');
            mostrarCarrito(); // Actualiza el carrito para reflejar el descuento
        } else {
            alert('Código de descuento inválido.');
        }
    });

    carritoIcono.addEventListener('click', () => {
        mostrarCarrito();
    });

    btnCerrarCarrito.addEventListener('click', () => {
        carritoContainer.style.display = 'none';
        overlay.style.display = 'none'; // Oculta el overlay
    });

    listaCarrito.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-eliminar')) {
            const index = event.target.dataset.index;
            eliminarServicioDelCarrito(index);
            mostrarCarrito();
            actualizarContador();
        }
    });

    function eliminarServicioDelCarrito(index) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    btnPagar.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length > 0) {
            alert('Redirigiendo a la página de pago...');
        } else {
            alert('El carrito está vacío. Agrega servicios antes de continuar.');
        }
    });

    actualizarContador();
});
