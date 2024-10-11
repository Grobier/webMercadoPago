document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const btnPagar = document.getElementById('btn-pagar');
    const carritoIcono = document.getElementById('carrito-icono');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoContainer = document.getElementById('carrito-container');

    botones.forEach((boton, index) => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const servicio = obtenerServicio(index);
            agregarServicioAlCarrito(servicio);
            mostrarCarrito();
            actualizarContador();
        });
    });

    function obtenerServicio(index) {
        const servicios = ['REHABILITACIÓN', 'ENTRENAMIENTO PERSONALIZADO', 'RECOVERY'];
        return servicios[index];
    }

    function agregarServicioAlCarrito(servicio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(servicio);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function mostrarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        listaCarrito.innerHTML = carrito.map(item => `<li>${item}</li>`).join('');
    }

    function actualizarContador() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    // Mostrar u ocultar el carrito cuando se hace clic en el icono del carrito
    carritoIcono.addEventListener('click', () => {
        carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Llamar a la función para mostrar el carrito y actualizar el contador al cargar la página
    mostrarCarrito();
    actualizarContador();

    btnPagar.addEventListener('click', () => {
        if (JSON.parse(localStorage.getItem('carrito')).length > 0) {
            alert('Redirigiendo a la página de pago...');
            // Aquí podrías redirigir a la página de pago, por ejemplo:
            // window.location.href = 'pago.html';
        } else {
            alert('El carrito está vacío. Agrega servicios antes de continuar.');
        }
    });
});
