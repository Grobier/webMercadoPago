Explicación del Proyecto
Este proyecto consiste en una aplicación web que permite a los usuarios seleccionar servicios relacionados con rehabilitación, entrenamiento y recuperación, agregar esos servicios a un carrito de compras, y finalmente realizar el pago a través de la integración con Mercado Pago.

Resumen General
Backend (index.js): Implementa un servidor Express que maneja la integración con Mercado Pago. Proporciona rutas para crear una preferencia de pago, necesaria para iniciar la transacción en la plataforma.
Frontend (script.js): Permite al usuario interactuar con la página para seleccionar servicios, gestionar el carrito de compras y proceder al pago.
Backend (index.js)
Configuración del Entorno

El archivo utiliza dotenv para cargar las variables de entorno desde un archivo .env. Esto permite almacenar de manera segura el Access Token de Mercado Pago sin exponerlo directamente en el código.
Se usa la biblioteca mercadopago para la integración con el servicio de pagos de Mercado Pago y express para el servidor backend.
Configuración del Servidor

Se inicializa una instancia de Express y se define un puerto (3000) para ejecutar el servidor.
Se usa cors para permitir solicitudes de otros dominios, facilitando la interacción entre el frontend y backend.
Ruta para Crear Preferencia de Pago

POST /crear_preferencia: Esta ruta recibe una lista de productos (servicios) seleccionados por el usuario desde el frontend. Con esta información se genera una preferencia de pago en Mercado Pago.
La preferencia incluye:
Items: Los productos añadidos al carrito.
URLs de Retorno: URLs a las que se redirige al usuario dependiendo del estado del pago (éxito, fallo, pendiente).
Auto-retorno: Configurado en "approved" para que redirija automáticamente cuando el pago sea exitoso.
Si la preferencia se crea exitosamente, se devuelve al frontend un init_point, que es el enlace para iniciar el flujo de pago en Mercado Pago.
Ruta de Bienvenida

GET /: Simplemente devuelve un mensaje de bienvenida al acceder al directorio raíz del servidor.
Inicio del Servidor

El servidor se pone en escucha en el puerto 3000, listo para recibir solicitudes.
Frontend (script.js)
Configuración Inicial

Se seleccionan varios elementos del DOM, como botones y contenedores, para facilitar la interacción con la página.
Define precios para tres servicios (Rehabilitacion, Entrenamiento, Recovery) y un código de descuento (DESCUENTO15) que permite aplicar un descuento del 15%.
Interacción del Usuario con los Servicios

Agregar Servicios al Carrito:
Cada botón de los servicios permite al usuario seleccionar la cantidad de sesiones y agregarla al carrito.
Se utiliza localStorage para almacenar la información del carrito, de manera que los datos se mantengan incluso si la página se recarga.
Se muestra un toast usando la librería Toastify para confirmar la adición del producto.
Obtener Sesiones: Una función (obtenerSesiones) que obtiene la cantidad de sesiones seleccionada por el usuario dependiendo del servicio.
Gestión del Carrito

Mostrar Carrito: Se genera dinámicamente la lista de servicios añadidos al carrito. También se calcula el total a pagar y se aplica un descuento si está activo.
Actualizar Contador: Muestra el número total de productos en el carrito.
Aplicar Descuento: Al ingresar el código de descuento correcto, se aplica un 15% de descuento al total.
Cerrar el Carrito: Funcionalidad para cerrar la vista del carrito y el overlay.
Eliminar del Carrito

Cada elemento del carrito tiene un botón para eliminarlo. Al hacer clic, el servicio se elimina de localStorage y se actualizan la vista del carrito y el contador.
Proceder al Pago

Al hacer clic en el botón de pago, se calcula el total considerando el descuento si está aplicado.
Se envía una solicitud al servidor backend (/crear_preferencia) con los items del carrito, para crear la preferencia de pago en Mercado Pago.
Si la respuesta contiene el enlace (init_point), el usuario es redirigido al flujo de pago para completar la transacción.
Flujo Completo del Proyecto
Agregar Servicios: El usuario selecciona uno o más servicios y la cantidad de sesiones, y los añade al carrito. Los datos se guardan localmente.
Visualización y Modificación del Carrito: El usuario puede ver el contenido del carrito, eliminar productos o aplicar un código de descuento.
Pago: Una vez listo, el usuario procede al pago. El backend recibe los detalles del carrito, genera la preferencia de pago y devuelve el enlace para realizar el pago seguro en Mercado Pago.
Funcionalidad Principal
Gestión de Carrito: Permitir a los usuarios seleccionar servicios, visualizar el carrito y proceder al pago.
Integración de Pago con Mercado Pago: A través de la ruta /crear_preferencia, se facilita la conexión con Mercado Pago para gestionar el pago de los servicios.
Consideraciones Técnicas
Backend: El servidor Express se encarga de manejar la lógica del pago. La integración con Mercado Pago es clave para iniciar el proceso de pago seguro.
Frontend: Gestiona toda la lógica relacionada con la selección de productos, actualización del carrito y comunicación con el backend para proceder al pago.
