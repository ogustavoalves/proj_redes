const express = require("express");
const axios = require("axios"); // Para fazer requisições HTTP
const app = express();

const PORT = 3000;
const BACKEND_URL = "http://18.209.85.44:3000/users"; // URL do seu backend

app.get("/", async (req, res) => {
  try {
    // Fazendo a requisição ao backend
    const response = await axios.get(BACKEND_URL);

    // Pegando o primeiro usuário retornado
    const user = response.data[0] || { username: "N/A", full_name: "N/A" };

    // Enviando o HTML com os dados do backend
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exemplo Simples</title>
      </head>
      <body>
        <h1>Bem-vindo ao Server X</h1>
        <p>Usuário: ${user.username}</p>
        <p>Nome do Usuário: ${user.full_name}</p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Erro ao buscar dados do backend:", error);
    res.status(500).send("Erro ao buscar dados.");
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
