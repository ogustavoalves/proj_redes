import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [username, setUsername] = useState(""); // Novo username
  const [fullName, setFullName] = useState(""); // Novo full_name
  const [loading, setLoading] = useState(true);

  // Função para buscar usuários do back-end
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Função para adicionar um novo usuário
  const addUser = async (e) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim()) return;

    try {
      const response = await axios.post("http://localhost:3000/users", {
        username,
        full_name: fullName,
      });
      setUsers([...users, response.data]); // Atualizar a lista de usuários
      setUsername(""); // Limpar campo de username
      setFullName(""); // Limpar campo de full_name
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  // Função para deletar um usuário
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="App">
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username} - <strong>Nome Completo:</strong> {user.full_name}
            <button onClick={() => deleteUser(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addUser}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o username"
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Digite o nome completo"
        />
        <button type="submit">Adicionar Usuário</button>
      </form>
    </div>
  );
}

export default App;
