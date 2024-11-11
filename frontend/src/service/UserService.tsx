import axios from 'axios';

const apiUrl = 'http://localhost:3000/usuarios';

interface User {
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  endereco: string;
  curso: string;
  instituicao: number;
}

const UserService = {
  listarUsuarios: async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },

  obterUsuario: async (id: number) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter usuário com ID ${id}:`, error);
      throw error;
    }
  },

  editarUsuario: async (id: number, dados: User) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao editar usuário com ID ${id}:`, error);
      throw error;
    }
  },

  criarUsuario: async (dados: User) => {
    try {
      const response = await axios.post(apiUrl, dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }
};

export default UserService;
