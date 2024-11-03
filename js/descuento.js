document.addEventListener('DOMContentLoaded', async () => {
    // Verifica si ya se ha mostrado el descuento previamente
    if (!localStorage.getItem('descuentoAplicado')) {
        // Muestra el pop-up para obtener el correo
        const { value: email } = await Swal.fire({
            title: "OBTENER DESCUENTO",
            text: "Ingresa tu correo para recibir un 15% de descuento",
            input: "email",
            inputPlaceholder: "Ingresa tu correo",
            confirmButtonText: "Obtener código"
        });

        // Si el usuario ingresa un correo, muestra el código de descuento
        if (email) {
            Swal.fire({
                title: "Código de descuento",
                text: "Tu código de descuento es: DESCUENTO15",
                icon: "success",
                confirmButtonText: "¡Gracias!"
            });

            // Guarda en localStorage que ya se mostró el descuento
            localStorage.setItem('descuentoAplicado', 'true');
        }
    }
});
