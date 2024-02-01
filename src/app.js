import express from 'express';
import expressHandlebars from 'express-handlebars';
import http from 'http';
import WebSocket from 'ws';
import utils from './utils';

const express = require('express');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.engine('handlebars', expressHandlebars());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('index');
});

wss.on('connection', (ws) => {
   console.log('Cliente conectado');
   const productos = [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }];
   ws.send(utils.formatProductos(productos));
});

const PORT = 3000;
server.listen(PORT, () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

