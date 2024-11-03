require('dotenv').config();
const mercadopago = require('mercadopago');
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


// Configuración del Access Token
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN // access token en archivo env
});

app.use(express.json());

// Ruta para crear la preferencia de pago
app.post('/crear_preferencia', async (req, res) => {
    // Extrae los items enviados desde el frontend
    const { items } = req.body;

    try {
        // Usa los items recibidos en la preferencia de Mercado Pago
        const preferencia = {
            items: items,
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preferencia);
        res.json({ init_point: response.body.init_point }); // Envía el punto de inicio al frontend
    } catch (error) {
        console.error('Error al crear la preferencia:', error.response ? error.response.data : error.message);
        res.status(500).send('Hubo un error al crear la preferencia');
    }
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
