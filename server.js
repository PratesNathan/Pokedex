// server.js
const express = require('express');
const app = express();
const path = require('path');

// Porta do servidor local
const PORT = 3000;

// Tornar a pasta 'public' acessível ao navegador
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que renderiza a Pokédex
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pokedex.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
